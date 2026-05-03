import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { X } from "lucide-react";
import d1 from "@/assets/design-1.jpg";
import d2 from "@/assets/design-2.png";
import d3 from "@/assets/design-3.jpg";
import d4 from "@/assets/design-4.png";
import d5 from "@/assets/design-5.jpg";
import d6 from "@/assets/design-6.png";

const designs = [
  { src: d1, alt: "Icestroke ice cream poster" },
  { src: d2, alt: "Vitamin C serum poster" },
  { src: d3, alt: "Wolnut perfume poster" },
  { src: d4, alt: "Pistachio gelato poster" },
  { src: d5, alt: "Chocolate refresh poster" },
  { src: d6, alt: "Starbucks pumpkin spice poster" },
];

const SPEED = 28; // seconds per loop

const DesignsCarousel = () => {
  const [open, setOpen] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const dragState = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  // Auto-scroll loop using transform (JS-driven so we can pause / drag).
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    const speed = 50; // px/sec
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!paused && el.scrollWidth > el.clientWidth) {
        el.scrollLeft += speed * dt;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  // Pointer drag
  const onDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    dragState.current = {
      down: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    setPaused(true);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !dragState.current.down) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 4) dragState.current.moved = true;
    el.scrollLeft = dragState.current.startScroll - dx;
  };
  const onUp = () => {
    dragState.current.down = false;
    setTimeout(() => setPaused(false), 600);
  };

  // Duplicate list for seamless loop
  const loop = [...designs, ...designs];

  return (
    <section
      id="designs"
      aria-label="Designs carousel"
      className="container relative py-20 lg:py-28"
    >
      <SectionTitle
        eyebrow="Designs"
        title="Posters & visual craft."
        highlight="320 80% 65%"
      />

      <div
        ref={trackRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="no-scrollbar flex cursor-grab gap-5 overflow-x-auto overscroll-x-contain pb-4 pt-2 active:cursor-grabbing sm:gap-6"
        style={{ scrollbarWidth: "none", touchAction: "pan-y" }}
      >
        {loop.map((d, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => {
              if (dragState.current.moved) return;
              setOpen(i % designs.length);
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="glass relative shrink-0 overflow-hidden rounded-2xl"
            style={{ width: "240px", height: "320px", willChange: "transform" }}
            aria-label={`Open ${d.alt}`}
          >
            <img
              src={d.src}
              alt={d.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-full w-full object-cover"
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-xl"
            onClick={() => setOpen(null)}
          >
            <motion.img
              key={open}
              src={designs[open].src}
              alt={designs[open].alt}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close preview"
              className="glass-button absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DesignsCarousel;
