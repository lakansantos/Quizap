"use client";
import {createContext, useContext, useState, ReactNode} from "react";

type ScoreContextType = {
  score: number;
  setScore: (score: (value: number) => number) => void;
};
const ScoreContext = createContext<ScoreContextType>({
  score: 0,
  setScore: () => {},
});

type ScoreProps = {
  children: ReactNode;
};
export const ScoreProvider = (props: ScoreProps) => {
  const {children} = props;
  const [score, setScore] = useState<number>(0);

  return (
    <ScoreContext.Provider
      value={{
        score: score,
        setScore,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export const useScoreContext = () => useContext(ScoreContext);
