import {useScoreContext} from "@/app/contexts/ScoreContext";
import React from "react";

const Finish = () => {
  const {score} = useScoreContext();

  return (
    <div>
      <h1>Congrats!</h1>
      <p>{score}</p>
      <p>Start again? </p>
      <button onClick={() => window.location.replace("/")}>Play</button>
    </div>
  );
};

export default Finish;
