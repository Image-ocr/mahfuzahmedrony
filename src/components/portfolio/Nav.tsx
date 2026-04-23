import { motion } from "framer-motion";
import { Moon, Sun, Download } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const Nav = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="fixed top-4 left-0 right-0 z-50 px-4 sm:top-6"
    >
      <div className="container flex items-center justify-between">
        <a href="#home" className="glass-button rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em]">
          Menu
        </a>

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
