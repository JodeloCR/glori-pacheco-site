import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function RecordCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 620, damping: 38, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 620, damping: 38, mass: 0.2 });

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(pointerQuery.matches && !reduceMotion);
    update();
    pointerQuery.addEventListener("change", update);
    return () => pointerQuery.removeEventListener("change", update);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("has-record-cursor");

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const handleOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest('a, button, [data-cursor="play"]')));
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerover", handleOver);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      document.body.classList.remove("has-record-cursor");
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerover", handleOver);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className={`record-cursor${visible ? " is-visible" : ""}${active ? " is-active" : ""}`}
      style={{ x: springX, y: springY }}
    >
      <span className="record-cursor__disc">
        <span className="record-cursor__groove" />
        <span className="record-cursor__label">♥</span>
        <span className="record-cursor__shine" />
      </span>
    </motion.div>
  );
}
