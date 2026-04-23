import { motion } from "framer-motion";
import { Mail, Facebook, Linkedin, Github } from "lucide-react";

const links = [
  { href: "mailto:mahfuzahmedrony@gmail.com", label: "Gmail", Icon: Mail },
  { href: "https://facebook.com/", label: "Facebook", Icon: Facebook },
  { href: "https://linkedin.com/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://github.com/", label: "GitHub", Icon: Github },
];

/**
 * SocialDock — fixed left-bottom column. Each icon "breathes" continuously
 * (subtle scale + glow drift), feeling like a living organism.
 */
const SocialDock = () => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 1.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed bottom-6 left-4 z-40 flex flex-col items-center gap-3"
      aria-label="Social links"
    >
      {/* living spine */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent/40 to-transparent"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {links.map(({ href, label, Icon }, i) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="glass-button group relative flex h-10 w-10 items-center justify-center rounded-full"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -3, 0, 2, 0],
            scale: [1, 1.04, 1, 0.98, 1],
          }}
          transition={{
            duration: 4 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        >
          <Icon className="h-4 w-4 transition-colors duration-300 group-hover:text-accent" />
          {/* breathing glow */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                "0 0 0 0 hsl(var(--accent) / 0)",
                "0 0 18px 2px hsl(var(--accent) / 0.35)",
                "0 0 0 0 hsl(var(--accent) / 0)",
              ],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        </motion.a>
      ))}
    </motion.aside>
  );
};

export default SocialDock;
