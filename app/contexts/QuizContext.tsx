"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import {supabase} from "@/app/utils/supabase";

export type QuizResult = {
  score: number;
  total: number;
  category: string | null;
  difficulty: string | null;
  date: string;
};

export type QuizProgress = {
  data: QuestionsData[];
  currentItem: number;
  correctCount: number;
  streak: number;
  score: number;
  showFeedback: boolean;
  isCorrect: boolean;
  clickedItem: string | null;
};

const POINTS_MULTIPLIER: Record<string, number> = {
  easy: 50,
  medium: 150,
  hard: 500,
};

type ScoreContextType = {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  playerId: string | null;
  playerName: string;
  setPlayerName: (value: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
  selectedDifficulty: string | null;
  setSelectedDifficulty: (value: string | null) => void;
  selectedNumberItems: number;
  setSelectedNumberItems: Dispatch<SetStateAction<number>>;
  isFinished: boolean;
  setIsFinished: Dispatch<SetStateAction<boolean>>;
  quizHistory: QuizResult[];
  addQuizResult: (result: QuizResult) => void;
  getTotalScore: () => number;
  getTotalPlayed: () => number;
  saveQuizResult: (result: QuizResult) => Promise<void>;
  updatePlayerNameInDB: (name: string) => Promise<void>;
  isAuthReady: boolean;
  quizProgress: QuizProgress | null;
  setQuizProgress: (progress: QuizProgress | null) => void;
};

const QuizContext = createContext<ScoreContextType>({
  score: 0,
  playerId: null,
  playerName: "",
  selectedCategory: null,
  selectedDifficulty: null,
  selectedNumberItems: 5,
  isFinished: false,
  quizHistory: [],
  isAuthReady: false,
  quizProgress: null,
  setQuizProgress: () => {},
  setSelectedCategory: () => {},
  setScore: () => {},
  setPlayerName: () => {},
  setSelectedDifficulty: () => {},
  setSelectedNumberItems: () => {},
  setIsFinished: () => {},
  addQuizResult: () => {},
  getTotalScore: () => 0,
  getTotalPlayed: () => 0,
  saveQuizResult: async () => {},
  updatePlayerNameInDB: async () => {},
});

type ScoreProps = {
  children: ReactNode;
};
export const ScoreProvider = (props: ScoreProps) => {
  const {children} = props;
  const [score, setScore] = useState<number>(0);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [playerName, setPlayerNameRaw] = useState<string>("");

  // Wrap setPlayerName to also persist to localStorage
  const setPlayerName = useCallback((name: string) => {
    setPlayerNameRaw(name);
    try {
      if (name) {
        localStorage.setItem("quizap_player_name", name);
      } else {
        localStorage.removeItem("quizap_player_name");
      }
    } catch {}
  }, []);
  const [selectedCategory, setSelectedCategoryRaw] = useState<string | null>(
    null
  );
  const setSelectedCategory = useCallback((value: string | null) => {
    setSelectedCategoryRaw(value);
    try {
      if (value) {
        localStorage.setItem("quizap_category", value);
      } else {
        localStorage.removeItem("quizap_category");
      }
    } catch {}
  }, []);

  const [selectedDifficulty, setSelectedDifficultyRaw] = useState<
    string | null
  >(null);
  const setSelectedDifficulty = useCallback((value: string | null) => {
    setSelectedDifficultyRaw(value);
    try {
      if (value) {
        localStorage.setItem("quizap_difficulty", value);
      } else {
        localStorage.removeItem("quizap_difficulty");
      }
    } catch {}
  }, []);

  const [selectedNumberItems, setSelectedNumberItemsRaw] = useState<number>(5);
  const setSelectedNumberItems: React.Dispatch<React.SetStateAction<number>> =
    useCallback((value: React.SetStateAction<number>) => {
      setSelectedNumberItemsRaw((prev) => {
        const next = typeof value === "function" ? value(prev) : value;
        try {
          localStorage.setItem("quizap_number_items", String(next));
        } catch {}
        return next;
      });
    }, []);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [quizProgress, setQuizProgressRaw] = useState<QuizProgress | null>(
    null
  );

  // Wrap setQuizProgress to persist to localStorage
  const setQuizProgress = useCallback((progress: QuizProgress | null) => {
    setQuizProgressRaw(progress);
    try {
      if (progress) {
        localStorage.setItem("quizap_quiz_progress", JSON.stringify(progress));
      } else {
        localStorage.removeItem("quizap_quiz_progress");
      }
    } catch {}
  }, []);

  // Restore quiz progress and selections from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("quizap_quiz_progress");
      if (saved) {
        const parsed = JSON.parse(saved) as QuizProgress;
        if (parsed?.data?.length) {
          setQuizProgressRaw(parsed);
          setScore(parsed.score);
        }
      }
      const cat = localStorage.getItem("quizap_category");
      if (cat) setSelectedCategoryRaw(cat);
      const diff = localStorage.getItem("quizap_difficulty");
      if (diff) setSelectedDifficultyRaw(diff);
      const num = localStorage.getItem("quizap_number_items");
      if (num) setSelectedNumberItemsRaw(Number(num));
    } catch {}
  }, []);

  // Anonymous auth on mount
  useEffect(() => {
    const initAuth = async () => {
      const {
        data: {session},
      } = await supabase.auth.getSession();

      if (session?.user) {
        setPlayerId(session.user.id);
        // Load player name from DB first, then fall back to localStorage
        const {data} = await supabase
          .from("players")
          .select("name")
          .eq("id", session.user.id)
          .single();
        if (data?.name) {
          setPlayerNameRaw(data.name);
        } else {
          try {
            const saved = localStorage.getItem("quizap_player_name");
            if (saved) setPlayerNameRaw(saved);
          } catch {}
        }
      } else {
        const {data, error} = await supabase.auth.signInAnonymously();
        if (!error && data.user) {
          setPlayerId(data.user.id);
        }
        // Check localStorage for name from a previous session
        try {
          const saved = localStorage.getItem("quizap_player_name");
          if (saved) setPlayerNameRaw(saved);
        } catch {}
      }
      setIsAuthReady(true);
    };

    initAuth();
  }, []);

  const addQuizResult = (result: QuizResult) => {
    setQuizHistory((prev) => [...prev, result]);
  };

  const getTotalScore = () => {
    return quizHistory.reduce((sum, r) => sum + r.score * 100, 0);
  };

  const getTotalPlayed = () => {
    return quizHistory.length;
  };

  const saveQuizResult = useCallback(
    async (result: QuizResult) => {
      if (!playerId) return;

      const multiplier =
        POINTS_MULTIPLIER[result.difficulty || "medium"] || 150;
      const points = result.score * multiplier;

      // Upsert player name
      await supabase.from("players").upsert({
        id: playerId,
        name: playerName || "Anonymous",
      });

      // Insert quiz result
      await supabase.from("quiz_results").insert({
        player_id: playerId,
        score: result.score,
        total: result.total,
        points,
        category: result.category,
        difficulty: result.difficulty,
      });
    },
    [playerId, playerName]
  );

  // Update player name in DB if player already exists (has played a game)
  const updatePlayerNameInDB = useCallback(
    async (name: string) => {
      if (!playerId || !name) return;

      const {data} = await supabase
        .from("players")
        .select("id")
        .eq("id", playerId)
        .single();

      if (data) {
        await supabase
          .from("players")
          .update({name})
          .eq("id", playerId);
      }
    },
    [playerId]
  );

  return (
    <QuizContext.Provider
      value={{
        score,
        setScore,
        playerId,
        playerName,
        setPlayerName,
        selectedCategory,
        setSelectedCategory,
        selectedDifficulty,
        setSelectedDifficulty,
        selectedNumberItems,
        setSelectedNumberItems,
        isFinished,
        setIsFinished,
        quizHistory,
        addQuizResult,
        getTotalScore,
        getTotalPlayed,
        saveQuizResult,
        updatePlayerNameInDB,
        isAuthReady,
        quizProgress,
        setQuizProgress,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);
