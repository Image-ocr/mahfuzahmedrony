import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import { Volume2, VolumeX } from "lucide-react";
import { useAudioBus } from "@/hooks/use-audio-bus";

const YT_ID = "MCBswubNBR8";
const ytSrc = (sound: boolean) =>
  `https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&mute=${sound ? 0 : 1}&loop=1&playlist=${YT_ID}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1&disablekb=1&fs=0`;

/**
 * Dedicated project video player section.
 * Mounts the iframe only when scrolled into view (mobile-friendly,
 * no background playback, no jank). Centered glass carousel layout.
 *
 * Coordinates with the AudioBus: when the user unmutes the video AND it's
 * in view, ambient music auto-fades out. When out of view or muted, music
 * resumes (if the user has enabled it).
 */
const ProjectVideo = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [sound, setSound] = useState(false);
  const { setVideoActive } = useAudioBus();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting && e.intersectionRatio > 0.2),
      { threshold: [0, 0.2, 0.5] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Tell the audio bus when this video is "active" (in view AND unmuted)
  useEffect(() => {
    setVideoActive(inView && sound);
    return () => setVideoActive(false);
  }, [inView, sound, setVideoActive]);

  return (
    <section
      ref={ref}
      id="showreel"
      aria-label="Project showreel"
      className="container relative py-20 lg:py-28"
    >
      <SectionTitle
        eyebrow="Showreel"
        title="Motion in practice."
        highlight="200 90% 60%"
      />

      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ willChange: "transform, opacity" }}
          className="glass relative mx-auto overflow-hidden rounded-3xl"
        >
          {/* header bar */}
          <div className="flex items-center justify-between px-4 py-2.5 sm:px-5">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-foreground/80">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Live · Loop
            </div>
            <button
              type="button"
              onClick={() => setSound((s) => !s)}
              aria-label={sound ? "Mute sound" : "Turn sound on"}
              title={sound ? "Mute" : "Unmute"}
              className="glass-button flex h-9 w-9 items-center justify-center rounded-full transition-transform active:scale-95"
            >
              {sound ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
          </div>

          {/* 16:9 video frame, centered */}
          <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
            {inView ? (
              <iframe
                key={sound ? "snd" : "mute"}
                src={ytSrc(sound)}
                title="Project showreel"
                loading="lazy"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen={false}
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/5 text-[11px] uppercase tracking-[0.3em] text-foreground/60">
                Loading…
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectVideo;
