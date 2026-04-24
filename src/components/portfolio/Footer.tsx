import VisitorCounter from "./VisitorCounter";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 pb-24 sm:pb-28">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 text-xs text-muted-foreground sm:flex-row">
        <div>© {new Date().getFullYear()} Mahfuz Ahmed Rony</div>
        <VisitorCounter />
        <div className="font-serif italic">Crafted with care · Dhaka</div>
      </div>
    </footer>
  );
};

export default Footer;
