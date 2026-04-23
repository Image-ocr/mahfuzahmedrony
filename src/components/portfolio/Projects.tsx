import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { ArrowUpRight } from "lucide-react";

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

const Projects = () => {
  return (
    <section id="projects" className="container relative py-32 lg:py-40">
      <SectionTitle eyebrow="Selected Work" title="Projects with intent." />

      <div className="space-y-6">
        {projects.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            className="glass group relative block overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 sm:p-12"
          >
            {/* hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
              <div className="text-sm text-muted-foreground lg:col-span-1">{p.no}</div>

              <div className="lg:col-span-7">
                <div className="mb-2 text-xs uppercase tracking-[0.25em] text-accent">{p.tag}</div>
                <h3 className="font-serif text-4xl leading-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-5xl lg:text-6xl">
                  {p.name}
                </h3>
                <p className="mt-4 max-w-xl text-foreground/70">{p.description}</p>
              </div>

              <div className="text-sm text-muted-foreground lg:col-span-2">{p.year}</div>

              <div className="lg:col-span-2 lg:text-right">
                <span className="inline-flex items-center gap-2 rounded-full glass-button px-5 py-3 text-sm">
                  Visit
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
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
