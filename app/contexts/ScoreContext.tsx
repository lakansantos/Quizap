"use client";
import {createContext, useContext, useState, ReactNode} from "react";

type ScoreContextType = {
  score: number;
  setScore: (score: (value: number) => number) => void;
  playerName: string;
  setPlayerName: (value: string) => void;
};
const ScoreContext = createContext<ScoreContextType>({
  score: 0,
  playerName: "",
  setScore: () => {},
  setPlayerName: () => {},
});

type ScoreProps = {
  children: ReactNode;
};
export const ScoreProvider = (props: ScoreProps) => {
  const {children} = props;
  const [score, setScore] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>("");

  return (
    <ScoreContext.Provider
      value={{
        score: score,
        setScore,
        playerName,
        setPlayerName,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export const useScoreContext = () => useContext(ScoreContext);
