import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/rony-hero.jpg";
import { ArrowDown, Download, Eye } from "lucide-react";

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative min-h-[100svh] w-full overflow-hidden bg-background">
      {/* Full-bleed photo starting from the very top */}
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
          className="h-full w-full object-cover object-top"
        />
        {/* Cinematic gradient — keeps face visible on top, fades to bg at bottom */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </motion.div>

      {/* Top availability chip */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute left-1/2 top-24 z-10 -translate-x-1/2 sm:top-28"
      >
        <div className="glass-button inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-foreground/80">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Available · 2026
        </div>
      </motion.div>

      {/* Bottom-left content block: name + subtitle + CTAs */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 sm:pb-20">
        <div className="container">
          <div className="max-w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-foreground/70 sm:text-xs"
            >
              <span className="h-px w-8 bg-accent" />
              Portfolio · 26
            </motion.div>

            {/* Artistic name */}
            <h1 className="font-display uppercase leading-[0.82] tracking-[-0.02em] text-foreground">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                className="block text-[26vw] sm:text-[22vw] lg:text-[18vw]"
              >
                RONY
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-4 max-w-md font-handwrite text-lg text-foreground/80 sm:text-xl"
            >
              Law · Web · Design — crafted with intent.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground sm:text-sm"
            >
              Mahfuz Ahmed Rony
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.15 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <a href="#projects" className="glass-button rounded-full px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] sm:text-sm">
                Projects
              </a>
              <a
                href="/MyCV.pdf"
                download="Mahfuz-Ahmed-Rony-CV.pdf"
                className="glass-button group inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] sm:text-sm"
              >
                <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                Resume
              </a>
              <a
                href="/MyCV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] sm:text-sm"
              >
                <Eye className="h-3.5 w-3.5" />
                View CV
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-5 right-5 z-10 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        <span>Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  );
};

export default Hero;
