import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/rony-hero.webp";
import { ArrowDown, Download, Eye } from "lucide-react";

const statement = [
  ["Designing", "systems."],
  ["Building", "interfaces."],
  ["Also", "a", "passionate", "lawyer."],
];

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // RONY split — RO drifts left, NY drifts right as user scrolls.
  // Scrolling back up returns them to center (natural loop).
  const roX = useTransform(scrollYProgress, [0, 0.6], ["0vw", "-55vw"]);
  const nyX = useTransform(scrollYProgress, [0, 0.6], ["0vw", "55vw"]);
  // Glow strongest when fully visible at top, fades as letters separate.
  const glow = useTransform(
    scrollYProgress,
    [0, 0.25, 0.6],
    [
      "0 0 80px hsl(var(--accent) / 0.55), 0 0 160px hsl(var(--accent) / 0.3)",
      "0 0 40px hsl(var(--accent) / 0.25)",
      "0 0 0px hsl(var(--accent) / 0)",
    ]
  );

  // Word reveal flat index counter for staggered timing across all lines
  let wordIndex = 0;

  return (
    <section ref={ref} id="home" className="relative min-h-[100svh] w-full overflow-hidden bg-background">
      {/* Full-bleed photo */}
      <motion.div
        style={{ y, scale, opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroImg}
          alt="Mahfuz Ahmed Rony — RONY"
          fetchPriority="high"
          decoding="async"
          loading="eager"
          className="h-full w-full object-cover object-top"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </motion.div>

      {/* Available chip — left side with green pulse */}
      <motion.a
        href="#contact"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="group fixed left-3 top-20 z-40 sm:left-4 sm:top-28"
      >
        <div className="glass-button inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-foreground/85 transition-all duration-300 group-hover:scale-105 sm:px-4 sm:py-2 sm:text-[10px] sm:tracking-[0.25em]">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ background: "hsl(var(--available))" }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: "hsl(var(--available))" }}
            />
          </span>
          <span>Available · 2026</span>
        </div>
      </motion.a>

      {/* Bottom-left content block */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 sm:pb-20"
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-foreground/70 sm:text-xs"
          >
            <span className="h-px w-8 bg-accent" />
            Portfolio · 26
          </motion.div>

          {/* Big artistic name — RO and NY split apart on scroll, glow at rest */}
          <h1 className="font-display uppercase leading-[0.82] tracking-[-0.02em] text-foreground">
            <span className="flex w-full items-baseline justify-center text-[26vw] sm:text-[22vw] lg:text-[18vw] will-change-transform">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                style={{ x: roX, textShadow: glow, willChange: "transform" }}
                className="inline-block"
              >
                RO
              </motion.span>
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
                style={{ x: nyX, textShadow: glow, willChange: "transform" }}
                className="inline-block"
              >
                NY
              </motion.span>
            </span>
          </h1>

          {/* Powerful staggered statement */}
          <div className="mt-6 max-w-3xl font-artistic text-xl leading-[1.18] tracking-tight text-foreground/90 sm:text-3xl lg:text-[2.5rem] lg:leading-[1.1]">
            {statement.map((line, li) => (
              <div
                key={li}
                className="overflow-hidden"
                style={{ marginTop: li === 0 ? 0 : "0.15em" }}
              >
                <div className="flex flex-wrap">
                  {line.map((word) => {
                    const idx = wordIndex++;
                    return (
                      <motion.span
                        key={`${li}-${idx}`}
                        initial={{ y: "110%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.9,
                          ease: [0.22, 1, 0.36, 1],
                          delay: 1.2 + idx * 0.09 + li * 0.18,
                        }}
                        className="mr-[0.28em] inline-block"
                      >
                        {word}
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="mt-5 text-xs uppercase tracking-[0.3em] text-muted-foreground sm:text-sm"
          >
            Mahfuz Ahmed Rony — Law · Web · Design
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="glass-button rounded-full px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] sm:text-sm"
            >
              Projects
            </motion.a>
            <motion.a
              href="/MyCV.pdf"
              download="Mahfuz-Ahmed-Rony-CV.pdf"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="glass-button group inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] sm:text-sm"
            >
              <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              Resume
            </motion.a>
            <motion.a
              href="/MyCV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="glass-button inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] sm:text-sm"
            >
              <Eye className="h-3.5 w-3.5" />
              View CV
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-5 right-5 z-10 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        <span>Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  );
};

export default Hero;
