import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import profileImg from "@/assets/rony-profile.jpg";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const lines = ["Law Student", "Web Developer", "Graphic Designer"];

  return (
    <section ref={ref} id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* ambient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <motion.div style={{ y, opacity }} className="container relative z-10 grid min-h-screen grid-cols-1 items-center gap-12 pt-28 pb-20 lg:grid-cols-12 lg:pt-32">
        {/* Left: text */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass-button px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Available for work · 2026
          </motion.div>

          <h1 className="font-serif text-[20vw] leading-[0.85] tracking-tight text-gradient sm:text-[16vw] lg:text-[12vw]">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              className="inline-block overflow-hidden"
            >
              RONY
            </motion.span>
          </h1>

          <div className="mt-8 flex flex-col gap-1 text-lg text-muted-foreground sm:text-xl lg:text-2xl">
            {lines.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.12 }}
                className="font-light"
              >
                <span className="text-accent">·</span> {line}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-10 max-w-md font-serif text-2xl italic leading-snug text-foreground/80 sm:text-3xl"
          >
            "Building bridges between law, code & craft."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.25 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a href="#projects" className="glass-button rounded-full px-7 py-3.5 text-sm font-medium">
              View Projects
            </a>
            <a href="#contact" className="glass-button rounded-full px-7 py-3.5 text-sm font-medium">
              Get in touch →
            </a>
          </motion.div>
        </div>

        {/* Right: profile glass card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="relative lg:col-span-5"
        >
          <div className="relative mx-auto aspect-[3/4] max-w-sm">
            {/* glow */}
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-accent/10 blur-2xl" />
            {/* glass frame */}
            <div className="glass relative h-full w-full overflow-hidden rounded-[2rem] p-2">
              <div className="relative h-full w-full overflow-hidden rounded-[1.7rem]">
                <img
                  src={profileImg}
                  alt="Portrait of Mahfuz Ahmed Rony — RONY"
                  className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
            {/* tag */}
            <div className="glass absolute -bottom-4 -left-4 rounded-2xl px-4 py-3 text-xs">
              <div className="text-muted-foreground">Based in</div>
              <div className="font-medium">Savar, Dhaka</div>
            </div>
            <div className="glass absolute -top-4 -right-4 rounded-2xl px-4 py-3 text-xs">
              <div className="text-muted-foreground">Currently</div>
              <div className="font-medium">LLB · Islamic Univ.</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        <span>Scroll</span>
        <ArrowDown className="h-4 w-4 animate-scroll-bounce" />
      </motion.a>
    </section>
  );
};

export default Hero;
