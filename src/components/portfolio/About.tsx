import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import SpotlightText from "./SpotlightText";

const About = () => {
  const text =
    "Mahfuz Ahmed Rony is a multidisciplinary individual combining legal knowledge, web development, and graphic design. Currently pursuing an LLB at Islamic University, he focuses on legal research, writing, and case analysis while building modern digital solutions. He is passionate about simplifying complex systems through technology and creating impactful, user-centered experiences.";

  return (
    <section id="about" className="container relative py-32 lg:py-40">
      <SectionTitle
        eyebrow="About"
        title="A quiet practice in three disciplines."
        highlight="0 85% 60%"
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:col-start-2">
          <SpotlightText
            text={text}
            speed={300}
            className="font-artistic text-xl leading-relaxed sm:text-2xl lg:text-[1.65rem] lg:leading-[1.55]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
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
