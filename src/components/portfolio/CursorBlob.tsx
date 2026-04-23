import { useEffect, useRef } from "react";

/**
 * CursorBlob — desktop-only gooey cursor follower.
 * Optimized: skips on touch + reduced motion, uses transform-only updates
 * via rAF, and pauses when the tab is hidden.
 */
const CursorBlob = () => {
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const posA = useRef({ x: 0, y: 0 });
  const posB = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    let running = true;
    const loop = () => {
      posA.current.x += (target.current.x - posA.current.x) * 0.18;
      posA.current.y += (target.current.y - posA.current.y) * 0.18;
      posB.current.x += (target.current.x - posB.current.x) * 0.06;
      posB.current.y += (target.current.y - posB.current.y) * 0.06;
      if (a.current) a.current.style.transform = `translate3d(${posA.current.x - 80}px, ${posA.current.y - 80}px, 0)`;
      if (b.current) b.current.style.transform = `translate3d(${posB.current.x - 120}px, ${posB.current.y - 120}px, 0)`;
      if (running) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <svg className="pointer-events-none fixed h-0 w-0" aria-hidden>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" />
          </filter>
        </defs>
      </svg>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] hidden md:block mix-blend-screen"
        style={{ filter: "url(#goo)", contain: "strict" }}
      >
        <div
          ref={a}
          className="absolute h-40 w-40 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--accent) / 0.35), transparent 70%)",
            willChange: "transform",
          }}
        />
        <div
          ref={b}
          className="absolute h-60 w-60 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--accent) / 0.22), transparent 70%)",
            willChange: "transform",
          }}
        />
      </div>
    </>
  );
};

export default CursorBlob;
