import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

const items = [
  {
    title: "Founder & Developer — JurisMind AI",
    body: "Built and shipped a legal research platform powered by AI, covering writing, document generation, and interactive Q&A for legal queries.",
  },
  {
    title: "Creator — MessWallet",
    body: "Designed and developed a real-world financial management tool for shared living environments — handling expenses and reporting.",
  },
  {
    title: "Multidisciplinary Practice",
    body: "Practical experience combining legal reasoning with technical execution and visual craft — translating complex problems into clean systems.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="container relative py-32 lg:py-40">
      <SectionTitle eyebrow="Experience" title="What I've been building." highlight="195 90% 60%" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            className="glass rounded-2xl p-7"
          >
            <div className="mb-4 text-xs uppercase tracking-[0.25em] text-accent">0{i + 1}</div>
            <h3 className="font-serif text-2xl leading-tight">{it.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
