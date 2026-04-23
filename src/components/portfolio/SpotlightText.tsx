import { useEffect, useRef, useState } from "react";

interface SpotlightTextProps {
  text: string;
  className?: string;
  /** ms per word in the looping spotlight */
  speed?: number;
}

/**
 * SpotlightText — when the paragraph enters the viewport, words light up
 * one after another in a continuous loop. Only one word glows at a time:
 * when the next word lights up, the previous word's glow turns off.
 */
const SpotlightText = ({ text, className = "", speed = 320 }: SpotlightTextProps) => {
  const words = text.split(" ");
  const ref = useRef<HTMLParagraphElement>(null);
  const [active, setActive] = useState<number>(-1);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    setActive(0);
    const id = window.setInterval(() => {
      i = (i + 1) % words.length;
      setActive(i);
    }, speed);
    return () => window.clearInterval(id);
  }, [inView, words.length, speed]);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const isActive = i === active;
        return (
          <span
            key={i}
            className="relative inline-block transition-all duration-300 ease-out"
            style={{
              color: isActive ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.45)",
              textShadow: isActive
                ? "0 0 24px hsl(var(--accent) / 0.85), 0 0 60px hsl(var(--accent) / 0.45)"
                : "none",
              transform: isActive ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            {w}
            {i < words.length - 1 && "\u00A0"}
          </span>
        );
      })}
    </p>
  );
};

export default SpotlightText;
