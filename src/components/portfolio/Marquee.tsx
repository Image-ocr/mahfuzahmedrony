import { useEffect, useRef, useState } from "react";

/**
 * Floating bottom RTL marquee — visible only after the Home/Hero section is passed.
 * Persists across all later sections as a glass overlay bar at the bottom.
 * Pure CSS animation (transform-only) for 60fps mobile performance.
 */
const TEXT =
  "WHAT YOU CREATE TODAY BECOMES THE WORLD SOMEONE LIVES IN TOMORROW · LET'S TALK ·";

const Marquee = () => {
  const words = TEXT.split(" ");
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const compute = () => {
      rafRef.current = null;
      const hero = document.getElementById("home") || document.querySelector("section");
      if (!hero) {
        setVisible(true);
        return;
      }
      const rect = (hero as HTMLElement).getBoundingClientRect();
      // Hide while Hero is still mostly on screen; show once it has scrolled past.
      const passed = rect.bottom < window.innerHeight * 0.4;
      setVisible(passed);
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const Row = (
    <div className="flex shrink-0 items-center gap-6 px-6 sm:gap-8 sm:px-8" aria-hidden="true">
      {words.map((w, i) => (
        <span
          key={i}
          className="marquee-word font-display text-base font-bold uppercase tracking-[0.08em] sm:text-xl"
          style={{ animationDelay: `${(i % 8) * 0.25}s` }}
        >
          {w}
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 px-2 pb-2 sm:px-4 sm:pb-3 transition-all duration-300 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ willChange: "transform, opacity" }}
    >
      <div className="glass relative mx-auto max-w-6xl overflow-hidden rounded-2xl py-2.5 sm:py-3">
        <div className="marquee-track flex w-max">
          {Row}
          {Row}
        </div>
        {/* edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent sm:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent sm:w-16" />
      </div>
    </div>
  );
};

export default Marquee;
