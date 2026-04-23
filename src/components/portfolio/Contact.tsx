import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { Mail, Phone, MapPin, Facebook, Linkedin, Github } from "lucide-react";

const socials = [
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/1CSycBCdWB/" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/mahfuz-ahmed-rony-6353513b4" },
  { icon: Github, label: "GitHub", href: "https://github.com/mahfuzahmedrony34-dev/mahfuzahmedrony34-dev.git" },
];

const contact = [
  { icon: Mail, label: "Email", value: "mahfuzahmedrony34@gmail.com", href: "mailto:mahfuzahmedrony34@gmail.com" },
  { icon: Phone, label: "Phone", value: "+880 1779 907579", href: "tel:+8801779907579" },
  { icon: MapPin, label: "Location", value: "Savar, Dhaka", href: null },
];

const Contact = () => {
  return (
    <section id="contact" className="container relative py-32 lg:py-40">
      <SectionTitle eyebrow="Contact" title="Let's build something." />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* big email link */}
        <motion.a
          href="mailto:mahfuzahmedrony34@gmail.com"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group block lg:col-span-8"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Drop a line</div>
          <div className="mt-4 break-all font-serif text-4xl leading-tight text-gradient transition-all duration-500 group-hover:text-accent sm:text-6xl lg:text-7xl">
            mahfuzahmedrony34@gmail.com
          </div>
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-4"
        >
          <ul className="space-y-4">
            {contact.map((c) => {
              const Inner = (
                <div className="flex items-center gap-4 border-b border-border/40 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5">
                    <c.icon className="h-4 w-4 text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{c.label}</div>
                    <div className="mt-0.5 text-sm">{c.value}</div>
                  </div>
                </div>
              );
              return (
                <li key={c.label}>
                  {c.href ? (
                    <a href={c.href} className="block transition-opacity hover:opacity-70">
                      {Inner}
                    </a>
                  ) : (
                    Inner
                  )}
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>

      {/* socials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-20 flex flex-wrap gap-4"
      >
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="glass-button flex items-center gap-3 rounded-full px-6 py-3.5"
          >
            <s.icon className="h-4 w-4" strokeWidth={1.5} />
            <span className="text-sm">{s.label}</span>
          </a>
        ))}
      </motion.div>
    </section>
  );
};

export default Contact;
