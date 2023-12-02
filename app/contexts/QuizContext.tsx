"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type ScoreContextType = {
  score: number;
  setScore: (score: (value: number) => number) => void;
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
};
const QuizContext = createContext<ScoreContextType>({
  score: 0,
  playerName: "",
  selectedCategory: null,
  selectedDifficulty: null,
  selectedNumberItems: 5,
  isFinished: false,
  setSelectedCategory: () => {},
  setScore: () => {},
  setPlayerName: () => {},
  setSelectedDifficulty: () => {},
  setSelectedNumberItems: () => {},
  setIsFinished: () => {},
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
  const [selectedNumberItems, setSelectedNumberItems] = useState<number>(5);
  const [isFinished, setIsFinished] = useState<boolean>(false);

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
        selectedNumberItems,
        setSelectedNumberItems,
        isFinished,
        setIsFinished,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);
