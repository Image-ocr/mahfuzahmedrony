import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";

/**
 * Local self-hosted video player. No YouTube, no external redirects.
 * Click the video to toggle play/pause. Autoplay muted, looped, lazy-loaded.
 */
const ProjectVideo = () => {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

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

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inView]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

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
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ willChange: "transform, opacity" }}
          className="glass relative mx-auto overflow-hidden rounded-3xl"
        >
          <div className="flex items-center justify-between px-4 py-2.5 sm:px-5">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-foreground/80">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Live · Loop
            </div>
          </div>

          <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
            {inView && (
              <video
                ref={videoRef}
                src="/my-project.mp4"
                onClick={togglePlay}
                onLoadedData={() => setLoaded(true)}
                autoPlay
                loop
                muted
                playsInline
                controls
                preload="metadata"
                className={`absolute inset-0 h-full w-full cursor-pointer bg-black object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
              />
            )}
            {!loaded && (
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
