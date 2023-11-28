"use client";
import {createContext, useContext, useState, ReactNode} from "react";

type ScoreContextType = {
  score: number;
  setScore: (score: (value: number) => number) => void;
  playerName: string;
  setPlayerName: (value: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (value: string) => void;
  selectedDifficulty: string | null;
  setSelectedDifficulty: (value: string) => void;
};
const QuizContext = createContext<ScoreContextType>({
  score: 0,
  playerName: "",
  selectedCategory: null,
  selectedDifficulty: null,
  setSelectedCategory: () => {},
  setScore: () => {},
  setPlayerName: () => {},
  setSelectedDifficulty: () => {},
});

type ScoreProps = {
  children: ReactNode;
};
export const ScoreProvider = (props: ScoreProps) => {
  const {children} = props;
  const [score, setScore] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );

  return (
    <QuizContext.Provider
      value={{
        score: score,
        setScore,
        playerName,
        setPlayerName,
        selectedCategory,
        setSelectedCategory,
        selectedDifficulty,
        setSelectedDifficulty,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);
