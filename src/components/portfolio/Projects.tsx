import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import { ArrowUpRight, X, Volume2, VolumeX, Play } from "lucide-react";
import jurismindImg from "@/assets/project-jurismind.png";
import messwalletImg from "@/assets/project-messwallet.png";

const projects = [
  {
    no: "01",
    name: "JurisMind AI",
    tag: "Legal-Tech · AI",
    description:
      "A legal-tech platform for legal research, writing, document generation, and AI-powered interaction.",
    link: "https://jurismind.live/AI",
    year: "2025",
    image: jurismindImg,
  },
  {
    no: "02",
    name: "MessWallet",
    tag: "FinTech · Web App",
    description:
      "A financial management system for shared living environments to track expenses and generate organized financial documents.",
    link: "https://messwallet.vercel.app/",
    year: "2025",
    image: messwalletImg,
  },
];

const YT_ID = "MCBswubNBR8";
const ytSrc = (sound: boolean) =>
  `https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&mute=${sound ? 0 : 1}&loop=1&playlist=${YT_ID}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1&disablekb=1&fs=0`;

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [userClosed, setUserClosed] = useState(false);
  const [sound, setSound] = useState(false); // OFF by default

  // Open popup automatically when projects section is in view
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
            setUserClosed(false);
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
      <SectionTitle eyebrow="Selected Work" title="Projects with intent." highlight="280 80% 65%" />

      {/* Floating glassmorphism YouTube popup */}
      <AnimatePresence>
        {popupOpen && (
          <motion.div
            key="yt-popup"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="fixed bottom-4 right-3 z-[60] w-[min(92vw,420px)] sm:bottom-6 sm:right-6 sm:w-[440px]"
          >
            <div className="glass relative overflow-hidden rounded-3xl">
              <div className="flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-foreground/80">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  Showreel · Live
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSound((s) => !s)}
                    aria-label={sound ? "Mute" : "Unmute"}
                    title={sound ? "Mute" : "Unmute"}
                    className="glass-button flex h-8 w-8 items-center justify-center rounded-full transition-transform active:scale-95"
                  >
                    {sound ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={closePopup}
                    aria-label="Close video"
                    className="glass-button flex h-8 w-8 items-center justify-center rounded-full"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
                <iframe
                  key={sound ? "snd" : "mute"}
                  src={ytSrc(sound)}
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
};

interface CardProps {
  project: (typeof projects)[number];
  index: number;
}

const ProjectCard = ({ project, index }: CardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
      style={{ willChange: "transform, opacity" }}
      className="group relative"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`relative block w-full overflow-hidden rounded-3xl text-left transition-transform duration-200 active:scale-[0.99] ${open ? "split-open" : ""}`}
      >
        {/* Image underneath */}
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            if (!open) {
              e.preventDefault();
              setOpen(true);
            }
            e.stopPropagation();
          }}
          aria-label={`Visit ${project.name}`}
          className="block"
        >
          <div className="relative h-72 w-full bg-foreground/5 sm:h-80">
            <img
              src={project.image}
              alt={project.name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain p-6"
            />
            {open && (
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-foreground/90 backdrop-blur">
                Visit <ArrowUpRight className="h-3 w-3" />
              </span>
            )}
          </div>
        </a>

        {/* Glass split halves */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="split-left glass absolute inset-y-0 left-0 w-1/2 border-r border-border/30">
            <div className="flex h-full flex-col justify-between p-6 sm:p-8">
              <div>
                <div className="text-xs text-muted-foreground">{project.no}</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-accent">
                  {project.tag}
                </div>
              </div>
              <h3 className="font-serif text-3xl leading-tight sm:text-4xl">
                {project.name.split(" ")[0]}
              </h3>
            </div>
          </div>
          <div className="split-right glass absolute inset-y-0 right-0 w-1/2">
            <div className="flex h-full flex-col items-end justify-between p-6 text-right sm:p-8">
              <div className="text-xs text-muted-foreground">{project.year}</div>
              <div>
                <h3 className="font-serif text-3xl leading-tight sm:text-4xl">
                  {project.name.split(" ").slice(1).join(" ") || project.name}
                </h3>
                <p className="mt-3 max-w-xs text-xs text-foreground/70">{project.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-accent">
                  <Play className="h-3 w-3" /> Tap to open
                </span>
              </div>
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
};

export default Projects;
