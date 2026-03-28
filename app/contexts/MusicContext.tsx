"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";

type MusicContextType = {
  isPlaying: boolean;
  volume: number;
  toggle: () => void;
  setPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
};

const MusicContext = createContext<MusicContextType>({
  isPlaying: false,
  volume: 50,
  toggle: () => {},
  setPlaying: () => {},
  setVolume: () => {},
});

// Procedural chill/lo-fi background music using Web Audio API
function createMusic(
  ctx: AudioContext,
  initialVolume: number
): {
  start: () => void;
  stop: () => void;
  setVolume: (v: number) => void;
} {
  const masterGain = ctx.createGain();
  masterGain.gain.value = initialVolume;
  masterGain.connect(ctx.destination);

  // Chord progression: Am -> F -> C -> G (lo-fi quiz vibe)
  const chords = [
    [220, 261.63, 329.63], // Am
    [174.61, 220, 261.63], // F
    [261.63, 329.63, 392], // C
    [196, 246.94, 293.66], // G
  ];

  let oscillators: OscillatorNode[] = [];
  let gains: GainNode[] = [];
  let intervalId: ReturnType<typeof setInterval> | null = null;
  let chordIndex = 0;

  function playChord() {
    // Fade out old oscillators
    gains.forEach((g) => {
      g.gain.setValueAtTime(g.gain.value || 0.001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    });
    setTimeout(() => {
      oscillators.forEach((o) => {
        try {
          o.stop();
        } catch {
          // already stopped
        }
      });
    }, 400);

    oscillators = [];
    gains = [];

    const chord = chords[chordIndex % chords.length];
    chordIndex++;

    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();

      oscillators.push(osc);
      gains.push(gain);
    });

    // Add a subtle pad layer
    const pad = ctx.createOscillator();
    const padGain = ctx.createGain();
    const padFilter = ctx.createBiquadFilter();

    pad.type = "triangle";
    pad.frequency.value = chord[0] / 2;
    padFilter.type = "lowpass";
    padFilter.frequency.value = 400;
    padGain.gain.setValueAtTime(0.001, ctx.currentTime);
    padGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.8);

    pad.connect(padFilter);
    padFilter.connect(padGain);
    padGain.connect(masterGain);
    pad.start();

    oscillators.push(pad);
    gains.push(padGain);
  }

  return {
    setVolume(v: number) {
      masterGain.gain.setValueAtTime(v, ctx.currentTime);
    },
    start() {
      chordIndex = 0;
      playChord();
      intervalId = setInterval(playChord, 2400);
    },
    stop() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      gains.forEach((g) => {
        g.gain.setValueAtTime(g.gain.value || 0.001, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      });
      setTimeout(() => {
        oscillators.forEach((o) => {
          try {
            o.stop();
          } catch {
            // already stopped
          }
        });
        oscillators = [];
        gains = [];
      }, 400);
    },
  };
}

// Convert 0-100 slider to gain (0-0.5 with exponential curve for natural feel)
function volumeToGain(v: number): number {
  return (v / 100) * (v / 100) * 0.5;
}

export const MusicProvider = ({children}: {children: ReactNode}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(() => {
    if (typeof window === "undefined") return 50;
    const saved = localStorage.getItem("quizap-music-volume");
    return saved ? Number(saved) : 50;
  });
  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicRef = useRef<ReturnType<typeof createMusic> | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (musicRef.current) {
        musicRef.current.stop();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Must be called from a user gesture (click) so AudioContext is allowed
  const startMusic = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    if (!musicRef.current) {
      musicRef.current = createMusic(audioCtxRef.current, volumeToGain(volume));
    }
    musicRef.current.start();
    setIsPlaying(true);
    localStorage.setItem("quizap-music", "true");
  }, [volume]);

  const stopMusic = useCallback(() => {
    if (musicRef.current) {
      musicRef.current.stop();
      musicRef.current = null;
    }
    setIsPlaying(false);
    localStorage.setItem("quizap-music", "false");
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  }, [isPlaying, startMusic, stopMusic]);

  const setPlaying = useCallback(
    (playing: boolean) => {
      if (playing) {
        startMusic();
      } else {
        stopMusic();
      }
    },
    [startMusic, stopMusic]
  );

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    localStorage.setItem("quizap-music-volume", String(v));
    if (musicRef.current) {
      musicRef.current.setVolume(volumeToGain(v));
    }
  }, []);

  return (
    <MusicContext.Provider
      value={{isPlaying, volume, toggle, setPlaying, setVolume}}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
