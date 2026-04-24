import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { Scale, Code2, Palette } from "lucide-react";

const groups = [
  {
    icon: Scale,
    label: "Legal",
    items: ["Legal Research", "Legal Writing", "Case Analysis", "Documentation"],
  },
  {
    icon: Code2,
    label: "Development",
    items: ["HTML", "CSS", "JavaScript", "Web Applications"],
  },
  {
    icon: Palette,
    label: "Design",
    items: ["Web Design", "Graphic Design", "UI / UX Design", "Visual Composition"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="container relative py-32 lg:py-40">
      <SectionTitle eyebrow="Capabilities" title="Three lenses, one mind." highlight="48 100% 60%" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {groups.map((g, gi) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: gi * 0.15 }}
            className="glass group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative">
              <div className="mb-8 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground/5">
                  <g.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                </div>
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">0{gi + 1}</span>
              </div>

              <h3 className="mb-6 font-serif text-3xl">{g.label}</h3>

              <ul className="space-y-3">
                {g.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: gi * 0.15 + 0.3 + i * 0.07 }}
                    className="flex items-center gap-3 border-b border-border/40 pb-3 text-sm text-foreground/80"
                  >
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
