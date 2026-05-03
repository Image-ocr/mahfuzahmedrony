import { useEffect, useRef, useState } from "react";
import { Users } from "lucide-react";

/**
 * Visitor counter — base 14610 + unique device hits via remote persistent
 * counter (abacus.jasoncameron.dev). Each device counts only once via
 * localStorage flag.
 */
const NS = "rony-portfolio";
const KEY = "visits";
const FLAG = "rp_visited_v2";
const BASE = 14610;

const fmt = (n: number) => n.toLocaleString();

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);
  const [display, setDisplay] = useState(0);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const isReturning = typeof window !== "undefined" && localStorage.getItem(FLAG);
    const url = isReturning
      ? `https://abacus.jasoncameron.dev/get/${NS}/${KEY}`
      : `https://abacus.jasoncameron.dev/hit/${NS}/${KEY}`;

    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: { value: number }) => {
        if (cancelled) return;
        if (!isReturning) localStorage.setItem(FLAG, "1");
        setCount(BASE + data.value);
      })
      .catch(() => {
        if (cancelled) return;
        setCount(BASE);
        if (!isReturning) localStorage.setItem(FLAG, "1");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (count == null) return;
    const start = performance.now();
    const from = 0;
    const to = count;
    const duration = 1100;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (t < 1) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [count]);

  return (
    <div
      role="status"
      aria-label="Unique visitor count"
      className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-foreground/85"
    >
      <Users className="h-3.5 w-3.5 text-accent" />
      <span className="tabular-nums font-semibold text-foreground">
        {count == null ? "—" : fmt(display)}
      </span>
      <span className="text-foreground/60">visitors</span>
    </div>
  );
};

export default VisitorCounter;
