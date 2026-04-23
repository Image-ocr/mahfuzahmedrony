import { motion } from "framer-motion";

const Nav = () => {
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
        <a href="#home" className="hidden font-serif text-xl tracking-wide sm:block">
          RONY<span className="text-accent">.</span>
        </a>
        <a href="#contact" className="glass-button rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em]">
          Contact
        </a>
      </div>
    </motion.header>
  );
};

export default Nav;
