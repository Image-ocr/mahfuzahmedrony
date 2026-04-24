import { useEffect } from "react";

/**
 * Mobile touch ripple — emits a soft, theme-adaptive glow at the tap point.
 * Uses a single CSS keyframe and removes nodes on animation end.
 * Disabled on coarse-pointer-less devices (desktop) and when reduced motion is on.
 */
const TouchRipple = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0] || e.changedTouches[0];
      if (!t) return;
      const el = document.createElement("div");
      el.className = "touch-ripple";
      el.style.left = `${t.clientX}px`;
      el.style.top = `${t.clientY}px`;
      document.body.appendChild(el);
      el.addEventListener("animationend", () => el.remove(), { once: true });
    };

    window.addEventListener("touchstart", onTouch, { passive: true });
    return () => window.removeEventListener("touchstart", onTouch);
  }, []);

  return null;
};

export default TouchRipple;
