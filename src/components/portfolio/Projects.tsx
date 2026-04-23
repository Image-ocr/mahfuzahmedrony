import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import { ArrowUpRight, Volume2, VolumeX, X } from "lucide-react";

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
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [userClosed, setUserClosed] = useState(false);

  // Open the popup automatically when the projects section enters the viewport.
  // Close + pause when it leaves. User can manually dismiss; won't reopen until they re-enter.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.25) {
            if (!userClosed) setPopupOpen(true);
          } else {
            setPopupOpen(false);
            setUserClosed(false); // re-arm for next entry
          }
        });
      },
      { threshold: [0, 0.25, 0.5] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [userClosed]);

  // Drive the video: try unmuted autoplay, fall back to muted if blocked.
  // Pause + reset when popup closes to save battery.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (popupOpen) {
      v.loop = true;
      v.playsInline = true;
      const tryPlay = async (withSound: boolean) => {
        v.muted = !withSound;
        if (withSound) v.volume = 1;
        try {
          await v.play();
          setMuted(!withSound);
          return true;
        } catch {
          return false;
        }
      };
      (async () => {
        const ok = await tryPlay(true);
        if (!ok) await tryPlay(false);
      })();

      // Seamless loop guard
      const onTime = () => {
        if (v.duration && v.currentTime >= v.duration - 0.05) {
          v.currentTime = 0;
          v.play().catch(() => {});
        }
      };
      v.addEventListener("timeupdate", onTime);

      // First user interaction unlocks audio if it was blocked
      const onInteract = () => {
        if (v.muted) tryPlay(true);
      };
      window.addEventListener("pointerdown", onInteract, { once: true });

      return () => {
        v.removeEventListener("timeupdate", onTime);
        window.removeEventListener("pointerdown", onInteract);
      };
    } else {
      v.pause();
    }
  }, [popupOpen]);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    if (!next) {
      v.volume = 1;
      v.play().catch(() => {});
    }
    setMuted(next);
  };

  const closePopup = () => {
    setUserClosed(true);
    setPopupOpen(false);
  };

  return (
    <section ref={sectionRef} id="projects" className="container relative py-32 lg:py-40">
      <SectionTitle eyebrow="Selected Work" title="Projects with intent." />

      {/* Floating glassmorphism video popup — auto-opens in view, pauses on exit */}
      <AnimatePresence>
        {popupOpen && (
          <motion.div
            key="video-popup"
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="fixed bottom-4 right-3 z-[60] w-[min(92vw,420px)] sm:bottom-6 sm:right-6 sm:w-[440px]"
          >
            <div className="glass relative overflow-hidden rounded-3xl">
              <div className="flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-foreground/80">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  Showreel · Live
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={toggleSound}
                    aria-label={muted ? "Unmute" : "Mute"}
                    className="glass-button flex h-8 w-8 items-center justify-center rounded-full"
                  >
                    {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-accent" />}
                  </button>
                  <button
                    type="button"
                    onClick={closePopup}
                    aria-label="Close video"
                    className="glass-button flex h-8 w-8 items-center justify-center rounded-full"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <video
                ref={videoRef}
                src="/my-project.mp4"
                autoPlay
                loop
                playsInline
                preload="auto"
                className="aspect-video h-auto w-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        {projects.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="glass group relative block overflow-hidden rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1 sm:p-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
              <div className="text-sm text-muted-foreground lg:col-span-1">{p.no}</div>

              <div className="lg:col-span-7">
                <div className="mb-2 text-xs uppercase tracking-[0.25em] text-accent">{p.tag}</div>
                <h3 className="font-serif text-4xl leading-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl lg:text-6xl">
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
