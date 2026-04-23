import { motion, useInView, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";

interface CurtainRevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * CurtainReveal — lightweight transform/opacity-only reveal.
 * Avoids clip-path (expensive on mobile) and box-shadow animations.
 * Respects prefers-reduced-motion.
 */
const CurtainReveal = ({ children, className = "" }: CurtainRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  if (reduce) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default CurtainReveal;
