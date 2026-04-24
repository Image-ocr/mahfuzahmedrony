import { motion } from "framer-motion";
import { useState } from "react";
import SectionTitle from "./SectionTitle";
import iuLogo from "@/assets/edu-iu.png";
import scpscLogo from "@/assets/edu-scpsc.png";
import { ExternalLink } from "lucide-react";

const items = [
  {
    period: "2024 — Present",
    title: "LLB · Bachelor of Laws",
    place: "Islamic University",
    note: "Legal research, writing, case analysis & jurisprudence.",
    logo: iuLogo,
    link: "https://iu.ac.bd/",
  },
  {
    period: "2022 — 2024",
    title: "HSC · Higher Secondary Certificate",
    place: "Savar Cantonment Public School & College",
    note: "Foundation in academics with focus on critical thinking.",
    logo: scpscLogo,
    link: "https://www.scpsc.edu.bd/",
  },
];

const Education = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="education" className="container relative py-32 lg:py-40">
      <SectionTitle eyebrow="Education" title="A path through study." highlight="142 70% 55%" />

      <div className="relative mx-auto max-w-4xl pl-8 lg:pl-12">
        {/* growing line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: "top" }}
          className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-accent via-accent/40 to-transparent lg:left-2"
        />

        <div className="space-y-10">
          {items.map((it, i) => {
            const open = openIdx === i;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                className="relative"
              >
                <div className="absolute -left-[2.1rem] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-background lg:-left-[2.6rem]" />

                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                  className={`glass relative w-full overflow-hidden rounded-3xl p-6 text-left transition-transform duration-200 active:scale-[0.99] ${open ? "cap-open" : ""}`}
                >
                  {/* meta row stays visible */}
                  <div className="text-xs uppercase tracking-[0.3em] text-accent">{it.period}</div>
                  <h3 className="mt-2 font-serif text-2xl sm:text-3xl">{it.title}</h3>
                  <div className="mt-1 text-foreground/70">{it.place}</div>
                  <p className="mt-2 max-w-xl text-sm text-muted-foreground">{it.note}</p>

                  {/* Reveal area: logo emerges from inside */}
                  <div className="relative mt-5 h-44 overflow-hidden rounded-2xl bg-foreground/5 sm:h-52">
                    {/* Logo deep inside */}
                    <a
                      href={it.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => {
                        if (!open) {
                          e.preventDefault();
                          setOpenIdx(i);
                        }
                        e.stopPropagation();
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                      aria-label={`Visit ${it.place}`}
                    >
                      <motion.img
                        src={it.logo}
                        alt={it.place}
                        loading="lazy"
                        decoding="async"
                        initial={false}
                        animate={open ? { scale: 1, y: 0, opacity: 1 } : { scale: 0.7, y: 16, opacity: 0.55 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="h-32 w-auto object-contain drop-shadow-2xl sm:h-40"
                      />
                      {open && (
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-foreground/90 backdrop-blur">
                          Visit <ExternalLink className="h-3 w-3" />
                        </span>
                      )}
                    </a>

                    {/* Glass lid that slides up to reveal */}
                    <div className="cap-lid pointer-events-none absolute inset-0">
                      <div className="glass flex h-full w-full items-center justify-center rounded-2xl">
                        <span className="text-[10px] uppercase tracking-[0.35em] text-foreground/70">
                          {open ? "" : "Tap to reveal"}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
