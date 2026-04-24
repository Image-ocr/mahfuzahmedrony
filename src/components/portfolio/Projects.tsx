import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import { ArrowUpRight, Play } from "lucide-react";
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

const AUTO_CLOSE_MS = 5000;

const Projects = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  // Manage a single auto-close timer for whichever card is active.
  useEffect(() => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (activeId) {
      timerRef.current = window.setTimeout(() => setActiveId(null), AUTO_CLOSE_MS);
    }
    return () => {
      if (timerRef.current != null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [activeId]);

  const handleToggle = (id: string) => {
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <section id="projects" className="container relative py-32 lg:py-40">
      <SectionTitle eyebrow="Selected Work" title="Projects with intent." highlight="280 80% 65%" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.name}
            project={p}
            index={i}
            open={activeId === p.name}
            onToggle={() => handleToggle(p.name)}
          />
        ))}
      </div>
    </section>
  );
};

interface CardProps {
  project: (typeof projects)[number];
  index: number;
  open: boolean;
  onToggle: () => void;
}

const ProjectCard = ({ project, index, open, onToggle }: CardProps) => {
  const toggle = onToggle;

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
        onClick={toggle}
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
