import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import { ArrowUpRight, X } from "lucide-react";

const projects = [
  {
    no: "01",
    name: "JurisMind AI",
    tag: "Legal-Tech · AI",
    description:
      "A legal-tech platform for legal research, writing, document generation, and AI-powered interaction.",
    link: "https://jurismind.live/AI",
    year: "2025",
  },
  {
    no: "02",
    name: "MessWallet",
    tag: "FinTech · Web App",
    description:
      "A financial management system for shared living environments to track expenses and generate organized financial documents.",
    link: "https://messwallet.vercel.app/",
    year: "2025",
  },
];

const YT_ID = "MCBswubNBR8";
// Muted autoplay (browser policy), looped via playlist trick, hide controls/branding.
const YT_SRC = `https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_ID}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1&disablekb=1&fs=0`;

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [userClosed, setUserClosed] = useState(false);

  // Open the popup automatically when the projects section is meaningfully in view.
  // Close when it leaves; don't re-open until user re-enters (after manual close).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.25) {
            if (!userClosed) setPopupOpen(true);
          } else {
            setPopupOpen(false);
            setUserClosed(false); // re-arm for next entry
          }
        });
      },
      { threshold: [0, 0.25, 0.5] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [userClosed]);

  const closePopup = () => {
    setUserClosed(true);
    setPopupOpen(false);
  };

  return (
    <section ref={sectionRef} id="projects" className="container relative py-32 lg:py-40">
      <SectionTitle eyebrow="Selected Work" title="Projects with intent." />

      {/* Floating glassmorphism YouTube popup — auto-mounts in view, unmounts on exit (stops playback) */}
      <AnimatePresence>
        {popupOpen && (
          <motion.div
            key="yt-popup"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="fixed bottom-4 right-3 z-[60] w-[min(92vw,420px)] sm:bottom-6 sm:right-6 sm:w-[440px]"
          >
            <div className="glass relative overflow-hidden rounded-3xl">
              <div className="flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-foreground/80">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  Showreel · Live
                </div>
                <button
                  type="button"
                  onClick={closePopup}
                  aria-label="Close video"
                  className="glass-button flex h-8 w-8 items-center justify-center rounded-full"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
                <iframe
                  src={YT_SRC}
                  title="Project showreel"
                  loading="lazy"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen={false}
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        {projects.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="glass group relative block overflow-hidden rounded-3xl p-8 transition-transform duration-200 hover:-translate-y-1 sm:p-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

            <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
              <div className="text-sm text-muted-foreground lg:col-span-1">{p.no}</div>

              <div className="lg:col-span-7">
                <div className="mb-2 text-xs uppercase tracking-[0.25em] text-accent">{p.tag}</div>
                <h3 className="font-serif text-4xl leading-tight transition-transform duration-200 group-hover:translate-x-1 sm:text-5xl lg:text-6xl">
                  {p.name}
                </h3>
                <p className="mt-4 max-w-xl text-foreground/70">{p.description}</p>
              </div>

              <div className="text-sm text-muted-foreground lg:col-span-2">{p.year}</div>

              <div className="lg:col-span-2 lg:text-right">
                <span className="inline-flex items-center gap-2 rounded-full glass-button px-5 py-3 text-sm">
                  Visit
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-45" />
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
