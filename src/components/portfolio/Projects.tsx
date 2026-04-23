import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  // Buffer fully, then play smoothly with sound (fallback to muted if blocked).
  // Auto-recover from stalls and ensure a seamless loop.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Prefer steady playback over latency
    v.preload = "auto";
    // Vendor attribute — present in some browsers; safe to assign
    (v as HTMLVideoElement & { disableRemotePlayback?: boolean }).disableRemotePlayback = true;
    v.playsInline = true;
    v.loop = true;

    const tryPlay = async (withSound: boolean) => {
      try {
        v.muted = !withSound;
        if (withSound) v.volume = 1;
        await v.play();
        setMuted(!withSound);
        return true;
      } catch {
        return false;
      }
    };

    const startWhenBuffered = async () => {
      // Wait until we have enough data to play through without stalling
      if (v.readyState < 4) {
        await new Promise<void>((resolve) => {
          const onReady = () => {
            v.removeEventListener("canplaythrough", onReady);
            resolve();
          };
          v.addEventListener("canplaythrough", onReady, { once: true });
          // Safety timeout — start anyway after 4s
          setTimeout(resolve, 4000);
        });
      }
      setReady(true);
      const ok = await tryPlay(true);
      if (!ok) await tryPlay(false);
    };

    // Seamless loop: jump just before the very end to avoid the gap
    const onTimeUpdate = () => {
      if (v.duration && v.currentTime >= v.duration - 0.05) {
        v.currentTime = 0;
        v.play().catch(() => {});
      }
    };

    // Stall recovery
    const onStalled = () => {
      v.play().catch(() => {});
    };
    const onWaiting = () => {
      // Nudge playback after a brief wait if the buffer recovers
      setTimeout(() => v.play().catch(() => {}), 250);
    };

    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("stalled", onStalled);
    v.addEventListener("waiting", onWaiting);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            startWhenBuffered();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(v);

    // Try unmuted on first user interaction (browsers often require this)
    const onFirstInteract = () => {
      tryPlay(true);
    };
    window.addEventListener("pointerdown", onFirstInteract, { once: true });
    window.addEventListener("keydown", onFirstInteract, { once: true });

    return () => {
      io.disconnect();
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("stalled", onStalled);
      v.removeEventListener("waiting", onWaiting);
      window.removeEventListener("pointerdown", onFirstInteract);
      window.removeEventListener("keydown", onFirstInteract);
    };
  }, []);

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

  return (
    <section id="projects" className="container relative py-32 lg:py-40">
      <SectionTitle eyebrow="Selected Work" title="Projects with intent." />

      {/* Showreel */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="glass group relative mb-10 overflow-hidden rounded-3xl"
      >
        <div className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full glass-button px-3 py-1.5 text-xs uppercase tracking-[0.2em]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Showreel
        </div>

        {/* Sound toggle */}
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="glass-button absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full"
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-accent" />}
        </button>

        {/* Buffering shimmer */}
        {!ready && (
          <div className="pointer-events-none absolute inset-0 z-[1] animate-pulse bg-gradient-to-br from-muted/40 via-background/20 to-muted/40" />
        )}

        <video
          ref={videoRef}
          src="/my-project.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      </motion.div>

      <div className="space-y-6">
        {projects.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            className="glass group relative block overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 sm:p-12"
          >
            {/* hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
              <div className="text-sm text-muted-foreground lg:col-span-1">{p.no}</div>

              <div className="lg:col-span-7">
                <div className="mb-2 text-xs uppercase tracking-[0.25em] text-accent">{p.tag}</div>
                <h3 className="font-serif text-4xl leading-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-5xl lg:text-6xl">
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
