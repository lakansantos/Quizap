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
});

type ScoreProps = {
  children: ReactNode;
};
export const ScoreProvider = (props: ScoreProps) => {
  const {children} = props;
  const [score, setScore] = useState<number>(0);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [selectedNumberItems, setSelectedNumberItems] = useState<number>(5);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [quizProgress, setQuizProgress] = useState<QuizProgress | null>(null);

  // Anonymous auth on mount
  useEffect(() => {
    const initAuth = async () => {
      const {
        data: {session},
      } = await supabase.auth.getSession();

      if (session?.user) {
        setPlayerId(session.user.id);
        // Load player name from DB
        const {data} = await supabase
          .from("players")
          .select("name")
          .eq("id", session.user.id)
          .single();
        if (data?.name) setPlayerName(data.name);
      } else {
        const {data, error} = await supabase.auth.signInAnonymously();
        if (!error && data.user) {
          setPlayerId(data.user.id);
        }
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
