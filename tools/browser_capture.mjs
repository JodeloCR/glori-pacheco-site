import { writeFile } from "node:fs/promises";

const [url, outputPath, widthArg = "1440", heightArg = "900", selector = "", clickSelector = "", motionMode = "reduce"] = process.argv.slice(2);
const port = process.env.CHROME_DEBUG_PORT ?? "9223";
const width = Number(widthArg);
const height = Number(heightArg);

if (!url || !outputPath) {
  throw new Error("Usage: browser_capture.mjs url output.png [width] [height] [selector]");
}

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function waitForChrome() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch {
      // Chrome is still starting.
    }
    await sleep(100);
  }
  throw new Error("Chrome debugging endpoint did not become ready");
}

await waitForChrome();
const target = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" }).then((response) =>
  response.json(),
);
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let commandId = 0;
const pending = new Map();
const waiters = new Map();
const browserErrors = [];

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const callbacks = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) callbacks?.reject(new Error(message.error.message));
    else callbacks?.resolve(message.result);
    return;
  }

  if (message.method === "Runtime.exceptionThrown") {
    browserErrors.push(message.params.exceptionDetails.text);
  }

  const waiter = waiters.get(message.method);
  if (waiter) {
    waiters.delete(message.method);
    waiter(message.params);
  }
});

function send(method, params = {}) {
  commandId += 1;
  return new Promise((resolve, reject) => {
    pending.set(commandId, { resolve, reject });
    socket.send(JSON.stringify({ id: commandId, method, params }));
  });
}

function waitForEvent(method) {
  return new Promise((resolve) => waiters.set(method, resolve));
}

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: width <= 640,
});
if (motionMode !== "normal") {
await send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-motion", value: "reduce" }],
});

}
const loaded = waitForEvent("Page.loadEventFired");
await send("Page.navigate", { url });
await loaded;
await send("Runtime.evaluate", {
  expression: "document.fonts.ready",
  awaitPromise: true,
  returnByValue: true,
});
await sleep(motionMode === "normal" ? 2400 : 900);

if (clickSelector) {
  await send("Runtime.evaluate", {
    expression: `document.querySelector(${JSON.stringify(clickSelector)})?.click()`,
    returnByValue: true,
  });
  await sleep(450);
}

if (selector) {
  await send("Runtime.evaluate", {
    expression: `document.querySelector(${JSON.stringify(selector)})?.scrollIntoView({block: "start"})`,
    returnByValue: true,
  });
  await sleep(450);
}

const metricsResult = await send("Runtime.evaluate", {
  expression: `(() => ({
    width: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
    height: document.documentElement.scrollHeight,
    scrollY: window.scrollY,
    target: ${selector ? `document.querySelector(${JSON.stringify(selector)})?.getBoundingClientRect().toJSON()` : "null"},
    overflowers: [...document.querySelectorAll("*")]
      .map((element) => ({
        tag: element.tagName,
        className: typeof element.className === "string" ? element.className : "",
        rect: element.getBoundingClientRect().toJSON()
      }))
      .filter((item) => item.rect.right > window.innerWidth + 1 || item.rect.left < -1)
      .slice(0, 12),
    text: document.body.innerText.slice(0, 300)
  }))()`,
  returnByValue: true,
});

const screenshot = await send("Page.captureScreenshot", {
  format: "png",
  fromSurface: true,
  captureBeyondViewport: false,
});
await writeFile(outputPath, Buffer.from(screenshot.data, "base64"));

console.log(
  JSON.stringify(
    {
      metrics: metricsResult.result.value,
      browserErrors,
    },
    null,
    2,
  ),
);

socket.close();
