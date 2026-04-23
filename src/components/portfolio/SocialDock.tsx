import { Mail, Facebook, Linkedin, Github } from "lucide-react";

const links = [
  { href: "mailto:mahfuzahmedrony@gmail.com", label: "Gmail", Icon: Mail },
  { href: "https://facebook.com/", label: "Facebook", Icon: Facebook },
  { href: "https://linkedin.com/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://github.com/", label: "GitHub", Icon: Github },
];

/**
 * SocialDock — fixed bottom-right column. CSS-only "breathing" animation
 * (transform + opacity only) for 60fps performance with no JS overhead.
 */
const SocialDock = () => {
  return (
    <aside
      className="fixed bottom-4 right-3 z-40 flex flex-col items-center gap-2 sm:bottom-6 sm:right-4 sm:gap-3 animate-fade-in"
      style={{ animationDelay: "1.2s", animationFillMode: "backwards" }}
      aria-label="Social links"
    >
      {links.map(({ href, label, Icon }, i) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="glass-button group relative flex h-9 w-9 items-center justify-center rounded-full sm:h-10 sm:w-10 social-breathe"
          style={{ animationDelay: `${i * 0.4}s`, willChange: "transform" }}
        >
          <Icon className="h-4 w-4 transition-colors duration-300 group-hover:text-accent" />
        </a>
      ))}
    </aside>
  );
};

export default SocialDock;
