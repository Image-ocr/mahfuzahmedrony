import { useEffect, useRef } from "react";
import { Music, VolumeX } from "lucide-react";
import { useAudioBus } from "@/hooks/use-audio-bus";

/**
 * Ambient background music — soft loop. Honors the audio bus:
 * pauses (with a smooth fade) whenever the project video is active.
 * Manual mute/unmute via floating glass button (bottom-left).
 */
const SRC = "/audio/ambient.mp3";
const TARGET_VOLUME = 0.18;

const AmbientAudio = () => {
  const ref = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const { musicMuted, toggleMusic, videoActive } = useAudioBus();

  // Try to start playback after first user interaction (browser policy)
  useEffect(() => {
    const tryPlay = () => {
      const a = ref.current;
      if (!a) return;
      a.volume = 0;
      a.play().catch(() => {});
      window.removeEventListener("pointerdown", tryPlay);
      window.removeEventListener("keydown", tryPlay);
    };
    window.addEventListener("pointerdown", tryPlay, { once: true });
    window.addEventListener("keydown", tryPlay, { once: true });
    return () => {
      window.removeEventListener("pointerdown", tryPlay);
      window.removeEventListener("keydown", tryPlay);
    };
  }, []);

  // Smooth fade in/out based on muted + videoActive state
  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    const shouldPlay = !musicMuted && !videoActive;
    const target = shouldPlay ? TARGET_VOLUME : 0;
    if (shouldPlay && a.paused) a.play().catch(() => {});

    if (fadeRef.current) window.clearInterval(fadeRef.current);
    const step = 0.02;
    fadeRef.current = window.setInterval(() => {
      if (!ref.current) return;
      const cur = ref.current.volume;
      if (Math.abs(cur - target) < step) {
        ref.current.volume = target;
        if (target === 0) ref.current.pause();
        if (fadeRef.current) {
          window.clearInterval(fadeRef.current);
          fadeRef.current = null;
        }
        return;
      }
      ref.current.volume = cur < target ? cur + step : cur - step;
    }, 30);

    return () => {
      if (fadeRef.current) {
        window.clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
    };
  }, [musicMuted, videoActive]);

  return (
    <>
      <audio ref={ref} src={SRC} loop preload="auto" playsInline />
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={musicMuted ? "Play ambient music" : "Mute ambient music"}
        title={musicMuted ? "Play ambient music" : "Mute ambient music"}
        className="glass-button fixed bottom-20 left-3 z-40 flex h-10 w-10 items-center justify-center rounded-full sm:bottom-24 sm:left-5"
      >
        {musicMuted ? <VolumeX className="h-4 w-4" /> : <Music className="h-4 w-4" />}
      </button>
    </>
  );
};

export default AmbientAudio;
