import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

const items = [
  {
    period: "2024 — Present",
    title: "LLB · Bachelor of Laws",
    place: "Islamic University",
    note: "Legal research, writing, case analysis & jurisprudence.",
  },
  {
    period: "2022 — 2024",
    title: "HSC · Higher Secondary Certificate",
    place: "Savar Cantonment Public School & College",
    note: "Foundation in academics with focus on critical thinking.",
  },
];

const Education = () => {
  return (
    <section id="education" className="container relative py-32 lg:py-40">
      <SectionTitle eyebrow="Education" title="A path through study." />

      <div className="relative mx-auto max-w-4xl pl-8 lg:pl-12">
        {/* growing line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: "top" }}
          className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-accent via-accent/40 to-transparent lg:left-2"
        />

        <div className="space-y-16">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.2 }}
              className="relative"
            >
              <div className="absolute -left-[2.1rem] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-background lg:-left-[2.6rem]" />
              <div className="text-xs uppercase tracking-[0.3em] text-accent">{it.period}</div>
              <h3 className="mt-3 font-serif text-3xl sm:text-4xl">{it.title}</h3>
              <div className="mt-2 text-foreground/70">{it.place}</div>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground">{it.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
