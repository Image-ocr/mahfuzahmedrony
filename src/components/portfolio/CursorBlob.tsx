import { useEffect, useRef } from "react";

/**
 * CursorBlob — a rare gooey/aurora cursor follower.
 * Uses SVG goo filter to merge a leading blob and a trailing blob
 * into a liquid metaball that lags behind the cursor — an effect
 * rarely seen on personal portfolios. Pointer-events disabled.
 */
const CursorBlob = () => {
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const posA = useRef({ x: 0, y: 0 });
  const posB = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip on touch
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const loop = () => {
      posA.current.x += (target.current.x - posA.current.x) * 0.18;
      posA.current.y += (target.current.y - posA.current.y) * 0.18;
      posB.current.x += (target.current.x - posB.current.x) * 0.06;
      posB.current.y += (target.current.y - posB.current.y) * 0.06;
      if (a.current) a.current.style.transform = `translate3d(${posA.current.x - 80}px, ${posA.current.y - 80}px, 0)`;
      if (b.current) b.current.style.transform = `translate3d(${posB.current.x - 120}px, ${posB.current.y - 120}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <svg className="pointer-events-none fixed h-0 w-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
            <feColorMatrix
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            />
          </filter>
        </defs>
      </svg>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] hidden md:block mix-blend-screen"
        style={{ filter: "url(#goo)" }}
      >
        <div
          ref={a}
          className="absolute h-40 w-40 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.35), transparent 70%)" }}
        />
        <div
          ref={b}
          className="absolute h-60 w-60 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.22), transparent 70%)" }}
        />
      </div>
    </>
  );
};

export default CursorBlob;
