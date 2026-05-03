import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Global heart-give microinteraction with persistent counter via abacus API.
 * Initial baseline 5720, plus shared count. Each user can give one heart
 * (enforced via localStorage). Liquid-fill heart SVG, count-up animation.
 */
const NS = "rony-portfolio";
const KEY = "hearts";
const FLAG = "rp_hearted_v1";
const BASE = 5720;

const fmt = (n: number) => n.toLocaleString();

const HeartCounter = () => {
  const [count, setCount] = useState<number | null>(null);
  const [display, setDisplay] = useState(0);
  const [given, setGiven] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const [bursts, setBursts] = useState<number[]>([]);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (typeof window !== "undefined" && localStorage.getItem(FLAG)) {
      setGiven(true);
    }
    fetch(`https://abacus.jasoncameron.dev/get/${NS}/${KEY}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: { value: number }) => {
        if (cancelled) return;
        setCount(BASE + data.value);
      })
      .catch(() => {
        if (!cancelled) setCount(BASE);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (count == null) return;
    const start = performance.now();
    const from = display;
    const to = count;
    if (from === to) return;
    const duration = 900;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const handleClick = async () => {
    if (given) return;
    setGiven(true);
    localStorage.setItem(FLAG, "1");
    setPulsing(true);
    setBursts((b) => [...b, Date.now()]);
    setTimeout(() => setPulsing(false), 800);
    // Optimistic
    setCount((c) => (c == null ? c : c + 1));
    try {
      const r = await fetch(`https://abacus.jasoncameron.dev/hit/${NS}/${KEY}`);
      if (r.ok) {
        const data = (await r.json()) as { value: number };
        setCount(BASE + data.value);
      }
    } catch {
      /* keep optimistic */
    }
  };

  return (
    <div className="container relative flex flex-col items-center justify-center pb-8 pt-4">
      <div className="glass relative flex items-center gap-5 rounded-full px-5 py-3 sm:gap-7 sm:px-7 sm:py-4">
        <motion.button
          type="button"
          onClick={handleClick}
          disabled={given}
          aria-label={given ? "You already gave a heart" : "Give a heart"}
          whileHover={!given ? { scale: 1.08 } : {}}
          whileTap={!given ? { scale: 0.92 } : {}}
          animate={pulsing ? { scale: [1, 1.18, 0.95, 1.05, 1] } : { scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex h-11 w-11 items-center justify-center rounded-full transition-shadow duration-300 sm:h-12 sm:w-12 ${
            given
              ? "cursor-default shadow-[0_0_22px_hsl(0_85%_60%/0.55)]"
              : "cursor-pointer hover:shadow-[0_0_18px_hsl(0_85%_60%/0.45)]"
          }`}
          style={{ willChange: "transform" }}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
            <defs>
              <clipPath id="heart-clip">
                <path d="M12 21s-7.5-4.6-9.5-9.2C1 8 3.5 4.5 7 4.5c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.3C19.5 16.4 12 21 12 21z" />
              </clipPath>
            </defs>
            <path
              d="M12 21s-7.5-4.6-9.5-9.2C1 8 3.5 4.5 7 4.5c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 6 3.5 4.5 7.3C19.5 16.4 12 21 12 21z"
              fill="none"
              stroke="hsl(0 85% 60%)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <g clipPath="url(#heart-clip)">
              <motion.rect
                x="0"
                width="24"
                fill="hsl(0 85% 60%)"
                initial={false}
                animate={given ? { y: 0, height: 24 } : { y: 24, height: 24 }}
                transition={{ duration: 0.75, ease: [0.65, 0, 0.35, 1] }}
              />
            </g>
          </svg>

          <AnimatePresence>
            {bursts.map((id) => (
              <motion.span
                key={id}
                initial={{ scale: 0.6, opacity: 0.7 }}
                animate={{ scale: 2.2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                onAnimationComplete={() =>
                  setBursts((b) => b.filter((x) => x !== id))
                }
                className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[hsl(0_85%_60%/0.5)]"
                style={{ willChange: "transform, opacity" }}
              />
            ))}
          </AnimatePresence>
        </motion.button>

        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
            Hearts
          </span>
          <span className="tabular-nums text-base font-semibold text-foreground sm:text-lg">
            {count == null ? "—" : fmt(display)}
          </span>
        </div>
      </div>
      {given && (
        <span className="mt-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Thank you ♥
        </span>
      )}
    </div>
  );
};

export default HeartCounter;
