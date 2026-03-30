"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

const TIMER_DURATIONS: Record<string, number> = {
  easy: 15,
  medium: 20,
  hard: 30,
};

const DIFFICULTY_BASE_POINTS: Record<string, number> = {
  easy: 100,
  medium: 200,
  hard: 300,
};

export function getTimerDuration(difficulty: string | null): number {
  return TIMER_DURATIONS[difficulty || "medium"] || 20;
}

export function calculatePoints(
  difficulty: string | null,
  timeLeft: number,
  timerEnabled: boolean
): number {
  const base = DIFFICULTY_BASE_POINTS[difficulty || "medium"] || 200;
  if (!timerEnabled) return base;
  const total = getTimerDuration(difficulty);
  const timeBonus = 1 + timeLeft / total; // 1.0x to 2.0x
  return Math.round(base * timeBonus);
}

type GameplayContextType = {
  timerEnabled: boolean;
  setTimerEnabled: (enabled: boolean) => void;
  autoAdvance: boolean;
  setAutoAdvance: (enabled: boolean) => void;
  showCorrectAnswer: boolean;
  setShowCorrectAnswer: (enabled: boolean) => void;
  confetti: boolean;
  setConfetti: (enabled: boolean) => void;
  vibration: boolean;
  setVibration: (enabled: boolean) => void;
};

const GameplayContext = createContext<GameplayContextType>({
  timerEnabled: false,
  setTimerEnabled: () => {},
  autoAdvance: false,
  setAutoAdvance: () => {},
  showCorrectAnswer: true,
  setShowCorrectAnswer: () => {},
  confetti: true,
  setConfetti: () => {},
  vibration: false,
  setVibration: () => {},
});

export const GameplayProvider = ({children}: {children: ReactNode}) => {
  const [timerEnabled, setTimerEnabledRaw] = useState(false);
  const [autoAdvance, setAutoAdvanceRaw] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswerRaw] = useState(true);
  const [confetti, setConfettiRaw] = useState(true);
  const [vibration, setVibrationRaw] = useState(false);

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("quizap_gameplay");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.timerEnabled === "boolean")
          setTimerEnabledRaw(parsed.timerEnabled);
        if (typeof parsed.autoAdvance === "boolean")
          setAutoAdvanceRaw(parsed.autoAdvance);
        if (typeof parsed.showCorrectAnswer === "boolean")
          setShowCorrectAnswerRaw(parsed.showCorrectAnswer);
        if (typeof parsed.confetti === "boolean")
          setConfettiRaw(parsed.confetti);
        if (typeof parsed.vibration === "boolean")
          setVibrationRaw(parsed.vibration);
      }
    } catch {}
  }, []);

  const persist = useCallback((updates: Partial<Record<string, unknown>>) => {
    try {
      const current = JSON.parse(
        localStorage.getItem("quizap_gameplay") || "{}"
      );
      localStorage.setItem(
        "quizap_gameplay",
        JSON.stringify({...current, ...updates})
      );
    } catch {}
  }, []);

  const setTimerEnabled = useCallback(
    (v: boolean) => {
      setTimerEnabledRaw(v);
      persist({timerEnabled: v});
    },
    [persist]
  );

  const setAutoAdvance = useCallback(
    (v: boolean) => {
      setAutoAdvanceRaw(v);
      persist({autoAdvance: v});
    },
    [persist]
  );

  const setShowCorrectAnswer = useCallback(
    (v: boolean) => {
      setShowCorrectAnswerRaw(v);
      persist({showCorrectAnswer: v});
    },
    [persist]
  );

  const setConfetti = useCallback(
    (v: boolean) => {
      setConfettiRaw(v);
      persist({confetti: v});
    },
    [persist]
  );

  const setVibration = useCallback(
    (v: boolean) => {
      setVibrationRaw(v);
      persist({vibration: v});
    },
    [persist]
  );

  return (
    <GameplayContext.Provider
      value={{
        timerEnabled,
        setTimerEnabled,
        autoAdvance,
        setAutoAdvance,
        showCorrectAnswer,
        setShowCorrectAnswer,
        confetti,
        setConfetti,
        vibration,
        setVibration,
      }}
    >
      {children}
    </GameplayContext.Provider>
  );
};

export const useGameplay = () => useContext(GameplayContext);
