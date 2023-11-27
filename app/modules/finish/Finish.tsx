import {useQuizContext} from "@/app/contexts/QuizContext";
import React from "react";

const Finish = () => {
  const {score, playerName} = useQuizContext();

  return (
    <div>
      <h1>Congrats {playerName}!</h1>
      <p>{score}</p>
      <p>Start again? </p>
      <button onClick={() => window.location.replace("/")}>Play</button>
    </div>
  );
};

export default Finish;
