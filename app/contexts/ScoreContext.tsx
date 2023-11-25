"use client";
import {createContext, useContext, useState, ReactNode} from "react";

const ScoreContext = createContext({});

type ScoreProps = {
  children: ReactNode;
};
export const ScoreProvider = (props: ScoreProps) => {
  const {children} = props;
  const [score, setScore] = useState(0);

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
