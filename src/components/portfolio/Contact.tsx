import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { Phone, MapPin, Facebook, Linkedin, Github } from "lucide-react";

const socials = [
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/1CSycBCdWB/" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/mahfuz-ahmed-rony-6353513b4" },
  { icon: Github, label: "GitHub", href: "https://github.com/mahfuzahmedrony34-dev/mahfuzahmedrony34-dev.git" },
];

const contact = [
  { icon: Phone, label: "Phone", value: "+880 1779 907579", href: "tel:+8801779907579" },
  { icon: MapPin, label: "Location", value: "Savar, Dhaka", href: null },
];

// Original Gmail logo as inline SVG (brand colors)
const GmailLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 256 193" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
    <path fill="#4285F4" d="M58.182 192.05V93.14L27.507 65.077 0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455z" />
    <path fill="#34A853" d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837-27.026 25.798z" />
    <path fill="#EA4335" d="m58.182 93.14-4.174-38.647 4.174-36.989L128 69.868l69.818-52.364 4.669 33.491-4.669 42.146L128 145.504z" />
    <path fill="#FBBC04" d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945z" />
    <path fill="#C5221F" d="m0 49.504 26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.231z" />
  </svg>
);

const Contact = () => {
  return (
    <section id="contact" className="container relative py-32 lg:py-40">
      <SectionTitle eyebrow="Contact" title="Let's build something." highlight="38 95% 60%" />

      <motion.a
        href="mailto:mahfuzahmedrony34@gmail.com"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group glass mb-12 flex flex-col items-start gap-5 overflow-hidden rounded-3xl p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8"
      >
        <div className="soft-bounce flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-background/40 p-3 ring-1 ring-border/40 sm:h-20 sm:w-20">
          <GmailLogo className="h-full w-full" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Drop a line</div>
          <div className="mt-1.5 break-all font-serif text-2xl leading-tight transition-colors duration-300 group-hover:text-accent sm:text-4xl lg:text-5xl">
            mahfuzahmedrony34@gmail.com
          </div>
        </div>
      </motion.a>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 lg:col-span-5"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="glass-button flex items-center gap-3 rounded-full px-5 py-3"
            >
              <s.icon className="h-4 w-4" strokeWidth={1.5} />
              <span className="text-sm">{s.label}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
