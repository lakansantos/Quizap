"use client";
import React from "react";
import {useQuizContext} from "@/app/contexts/QuizContext";
import {useRouter} from "next/navigation";

const Finish = () => {
  const {
    score,
    playerName,
    setScore,
    setIsFinished,
    setSelectedCategory,
    setSelectedDifficulty,
    setSelectedNumberItems,
  } = useQuizContext();

  const router = useRouter();

  return (
    <div>
      <h1>Congrats {playerName}!</h1>
      <p>{score}</p>
      <p>Start again? </p>
      <button
        onClick={() => {
          setIsFinished(false);
          setSelectedCategory(null);
          setSelectedDifficulty(null);
          setSelectedNumberItems(5);
          setScore(0);
          router.push("/choices");
        }}
      >
        Play
      </button>
    </div>
  );
};

export default Finish;
