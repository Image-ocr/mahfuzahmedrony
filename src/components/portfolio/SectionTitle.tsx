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
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-serif text-5xl leading-[0.95] tracking-tight text-gradient sm:text-7xl lg:text-8xl"
      >
        {title}
      </motion.h2>
    </div>
  );
};

export default SectionTitle;
