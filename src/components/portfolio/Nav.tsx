import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Download, X, Menu as MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

const sections = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Capabilities" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const Nav = () => {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-0 right-0 z-50 px-4 sm:top-6"
    >
      <div className="container flex items-center justify-between">
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Open menu"
            className="glass-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em]"
          >
            {open ? <X className="h-3.5 w-3.5" /> : <MenuIcon className="h-3.5 w-3.5" />}
            Menu
          </button>

          <AnimatePresence>
            {open && (
              <motion.nav
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: "transform, opacity" }}
                className="glass absolute left-0 top-12 w-56 rounded-2xl p-2"
              >
                <ul className="flex flex-col">
                  {sections.map((s, i) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between rounded-xl px-4 py-2.5 text-xs uppercase tracking-[0.22em] text-foreground/85 transition-colors duration-200 hover:bg-foreground/5 hover:text-accent"
                      >
                        <span>{s.label}</span>
                        <span className="text-[10px] text-muted-foreground">0{i + 1}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/MyCV.pdf"
            download="Mahfuz-Ahmed-Rony-CV.pdf"
            className="glass-button hidden items-center gap-1.5 rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] sm:inline-flex"
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </a>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="glass-button flex h-9 w-9 items-center justify-center rounded-full"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a href="#contact" className="glass-button rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em]">
            Contact
          </a>
        </div>
      </div>
    </motion.header>
  );
};

export default Nav;
