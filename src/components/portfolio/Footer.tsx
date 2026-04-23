const Footer = () => {
  return (
    <footer className="border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-3 py-10 text-xs text-muted-foreground sm:flex-row">
        <div>© {new Date().getFullYear()} Mahfuz Ahmed Rony</div>
        <div className="font-serif italic">Crafted with care · Dhaka</div>
      </div>
    </footer>
  );
};

export default Footer;
