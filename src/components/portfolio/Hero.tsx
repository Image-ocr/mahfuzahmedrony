import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/rony-hero.jpg";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* Full-bleed photo */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Mahfuz Ahmed Rony — RONY"
          className="h-full w-full object-cover object-center"
        />
        {/* Bottom fade for legibility of name */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/70 to-transparent" />
        {/* Subtle top fade for nav */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-end pb-12 sm:pb-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass-button px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Available for work · 2026
          </motion.div>

          <h1 className="font-serif font-bold leading-[0.82] tracking-tight text-foreground">
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              className="block text-[26vw] sm:text-[22vw] lg:text-[18vw]"
            >
              RONY
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            Law Student × Web Developer × Graphic Designer
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#projects" className="glass-button rounded-full px-7 py-3.5 text-sm font-medium">
              View Projects
            </a>
            <a href="#contact" className="glass-button rounded-full px-7 py-3.5 text-sm font-medium">
              Get in touch →
            </a>
          </motion.div>
        </div>
      </div>

      {/* scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        <span>Scroll</span>
        <ArrowDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
};

export default Hero;
