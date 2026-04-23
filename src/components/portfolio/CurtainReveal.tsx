import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface CurtainRevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * CurtainReveal — a rare clip-path "curtain unroll" effect.
 * Each section unrolls vertically from top with a diagonal mask edge
 * and an accent light-bar that sweeps down ahead of the content.
 */
const CurtainReveal = ({ children, className = "" }: CurtainRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Sweeping light bar */}
      <motion.div
        initial={{ top: "-10%", opacity: 0 }}
        animate={inView ? { top: "110%", opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
        className="pointer-events-none absolute left-0 right-0 z-20 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--accent)), transparent)",
          boxShadow: "0 0 40px hsl(var(--accent) / 0.8), 0 0 80px hsl(var(--accent) / 0.5)",
        }}
      />
      <motion.div
        initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 5%)" }}
        animate={
          inView
            ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }
            : {}
        }
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default CurtainReveal;
