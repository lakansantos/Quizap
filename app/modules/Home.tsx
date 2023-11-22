"use client";
import React, {useState} from "react";

import Start from "./Start";

const Home = () => {
  const [playerName, setPlayerName] = useState("");

  return (
    <div className="h-[100vh]">
      <Start setPlayerName={setPlayerName} playerName={playerName} />
    </div>
  );
};

export default Home;
