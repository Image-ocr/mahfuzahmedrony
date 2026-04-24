import { useEffect, useRef, useState } from "react";

/**
 * ScrollRail — slim glass progress bar fixed near the bottom.
 * Activates when the About section enters view; tracks scroll
 * progress from About start to page end.
 */
const ScrollRail = () => {
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const about = document.getElementById("about");
    if (!about) return;

    const io = new IntersectionObserver(
      ([e]) => setActive(e.isIntersecting || e.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    io.observe(about);

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const start = about.getBoundingClientRect().top + window.scrollY;
        const end = document.documentElement.scrollHeight - window.innerHeight;
        const cur = window.scrollY;
        const p = Math.max(0, Math.min(1, (cur - start) / Math.max(1, end - start)));
        setProgress(p);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed bottom-16 left-1/2 z-40 h-[3px] w-[min(70vw,520px)] -translate-x-1/2 overflow-hidden rounded-full transition-opacity duration-300 sm:bottom-20 ${active ? "opacity-100" : "opacity-0"}`}
      style={{ background: "hsl(var(--glass-bg) / 0.08)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="h-full origin-left rounded-full bg-accent"
        style={{
          transform: `scaleX(${progress})`,
          transformOrigin: "left center",
          transition: "transform 0.12s linear",
          willChange: "transform",
          boxShadow: "0 0 12px hsl(var(--accent) / 0.6)",
        }}
      />
    </div>
  );
};

export default ScrollRail;
