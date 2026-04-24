import { motion } from "framer-motion";
import type { CSSProperties } from "react";

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  /** HSL triplet (e.g. "0 85% 60%") used to color-cycle the title words */
  highlight?: string;
  className?: string;
}

const SectionTitle = ({ eyebrow, title, highlight, className = "" }: SectionTitleProps) => {
  const words = title.split(" ");
  const style = highlight ? ({ ["--hl" as string]: highlight } as CSSProperties) : undefined;

  return (
    <div className={`mb-16 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        <span className="h-px w-8 bg-accent" />
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={style}
        className="word-cycle font-display font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-foreground text-5xl sm:text-7xl lg:text-8xl"
      >
        {words.map((w, i) => (
          <span
            key={`${w}-${i}`}
            style={{ animationDelay: `${i * 0.35}s`, marginRight: "0.22em" }}
          >
            {w}
          </span>
        ))}
      </motion.h2>
    </div>
  );
};

export default SectionTitle;
