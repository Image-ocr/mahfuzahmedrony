import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/rony-hero.jpg";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="container relative z-10 flex min-h-screen flex-col pt-28 sm:pt-32">
        {/* Availability chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full glass-button px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Available for work · 2026
        </motion.div>

        {/* Name */}
        <h1 className="text-center font-display uppercase leading-[0.85] tracking-tight text-foreground">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="block text-[28vw] sm:text-[24vw] lg:text-[20vw]"
          >
            RONY
          </motion.span>
        </h1>

        {/* Photo under the name — face visible */}
        <motion.div
          style={{ y, opacity }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="relative mx-auto mt-2 w-full max-w-3xl flex-1"
        >
          <div className="relative h-[55vh] w-full overflow-hidden sm:h-[60vh]">
            <img
              src={heroImg}
              alt="Mahfuz Ahmed Rony — RONY"
              className="h-full w-full object-cover object-top"
            />
            {/* Soft fade into background at bottom */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
          </div>

          {/* Subtitle + CTAs */}
          <div className="relative z-10 -mt-10 text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base"
            >
              Law Student · Web Developer · Graphic Designer
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-6 flex flex-wrap justify-center gap-3"
            >
              <a href="#projects" className="glass-button rounded-full px-7 py-3.5 text-sm font-medium">
                View Projects
              </a>
              <a href="#contact" className="glass-button rounded-full px-7 py-3.5 text-sm font-medium">
                Get in touch →
              </a>
            </motion.div>
          </div>
        </motion.div>
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
