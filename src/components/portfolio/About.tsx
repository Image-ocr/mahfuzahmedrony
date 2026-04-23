import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

const About = () => {
  const text =
    "Mahfuz Ahmed Rony is a multidisciplinary individual combining legal knowledge, web development, and graphic design. Currently pursuing an LLB at Islamic University, he focuses on legal research, writing, and case analysis while building modern digital solutions. He is passionate about simplifying complex systems through technology and creating impactful, user-centered experiences.";

  const words = text.split(" ");

  return (
    <section id="about" className="container relative py-32 lg:py-40">
      <SectionTitle eyebrow="About" title="A quiet practice in three disciplines." />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:col-start-2">
          <p className="text-xl leading-relaxed text-foreground/90 sm:text-2xl lg:text-[1.65rem] lg:leading-[1.5]">
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.012 }}
                className="inline-block"
              >
                {w}&nbsp;
              </motion.span>
            ))}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-3"
        >
          <div className="glass rounded-2xl p-6">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Focus</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex justify-between border-b border-border/40 pb-2">
                <span className="text-muted-foreground">Discipline</span>
                <span>Law</span>
              </li>
              <li className="flex justify-between border-b border-border/40 pb-2">
                <span className="text-muted-foreground">Craft</span>
                <span>Web</span>
              </li>
              <li className="flex justify-between border-b border-border/40 pb-2">
                <span className="text-muted-foreground">Eye</span>
                <span>Design</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Locale</span>
                <span>Dhaka, BD</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
