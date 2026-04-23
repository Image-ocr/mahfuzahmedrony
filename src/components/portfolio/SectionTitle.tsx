import { motion } from "framer-motion";

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  className?: string;
}

const SectionTitle = ({ eyebrow, title, className = "" }: SectionTitleProps) => {
  return (
    <div className={`mb-16 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        <span className="h-px w-8 bg-accent" />
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="font-display font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-foreground text-5xl sm:text-7xl lg:text-8xl"
      >
        {title}
      </motion.h2>
    </div>
  );
};

export default SectionTitle;
