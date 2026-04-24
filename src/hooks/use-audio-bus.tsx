import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";

/**
 * Audio bus — coordinates ambient background music with project video.
 * When the project video is unmuted/playing audio, ambient music fades out.
 */
interface AudioBusValue {
  videoActive: boolean;
  setVideoActive: (active: boolean) => void;
  musicMuted: boolean;
  toggleMusic: () => void;
  setMusicMuted: (m: boolean) => void;
}

const AudioBusContext = createContext<AudioBusValue | undefined>(undefined);

export const AudioBusProvider = ({ children }: { children: ReactNode }) => {
  const [videoActive, setVideoActive] = useState(false);
  const [musicMuted, setMusicMuted] = useState(true); // start muted (browser policy)

  const toggleMusic = useCallback(() => setMusicMuted((m) => !m), []);

  const value = useMemo(
    () => ({ videoActive, setVideoActive, musicMuted, toggleMusic, setMusicMuted }),
    [videoActive, musicMuted, toggleMusic]
  );

  return <AudioBusContext.Provider value={value}>{children}</AudioBusContext.Provider>;
};

export const useAudioBus = () => {
  const ctx = useContext(AudioBusContext);
  if (!ctx) throw new Error("useAudioBus must be used within AudioBusProvider");
  return ctx;
};
