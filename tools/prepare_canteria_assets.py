from __future__ import annotations

from pathlib import Path

import fitz
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
EPK = ROOT / "public" / "press" / "Glori-Pacheco-EPK-ES.pdf"
OUTPUT = ROOT / "public" / "images"

# Página 8 del EPK: la sección Cantería Live Session, en orden de aparición.
ASSETS = {
    1: "canteria-cohorte.webp",
    2: "canteria-london-room.webp",
    3: "canteria-live.webp",
}


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    document = fitz.open(EPK)
    page = document[7]

    for index, image_ref in enumerate(page.get_images(full=True), start=1):
        output_name = ASSETS.get(index)
        if not output_name:
            continue

        raw = document.extract_image(image_ref[0])["image"]
        with Image.open(__import__("io").BytesIO(raw)) as image:
            image = ImageOps.exif_transpose(image).convert("RGB")
            image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
            image.save(OUTPUT / output_name, "WEBP", quality=84, method=6)
            size_kb = (OUTPUT / output_name).stat().st_size // 1024
            print(f"{output_name}: {image.width}x{image.height}  {size_kb}kB")

    document.close()


if __name__ == "__main__":
    main()
