"use client";
import React, {useEffect, useState} from "react";
import Quizzes from "./Quizzes";
import Start from "./Start";
import Finish from "./Finish";
import Choices from "./Choices";

type Props = {
  data: QuestionsData[];
};

const Home = (props: Props) => {
  const {data} = props;

  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [getCorrectAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [currentItem, setCurrentItem] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [progress, setProgress] = useState(0);
  const [playerName, setPlayerName] = useState("");

  const params = {
    categories: "science",
    difficulty: "easy",
    limit: 5,
  };

  const handleChange = (
    choices: string[],
    key: number,
    correctAnswer: string
  ) => {
    setClickedItem(choices[key]);
    setCorrectAnswer(correctAnswer);
  };

  const slicedData = [data[currentItem]];

  const handleSubmit = () => {
    setIsSubmitted(true);

    setCurrentItem(currentItem + 1);
    const lastItem = currentItem === data.length - 1;

    if (lastItem) {
      setCurrentItem(currentItem);
      setIsFinished(true);
      setProgress(3);
    }
  };

  useEffect(() => {
    if (isSubmitted && !!clickedItem && getCorrectAnswer === clickedItem) {
      setScore((prev) => prev + 1);
      setClickedItem(null);
      setIsSubmitted(false);
    }
  }, [isSubmitted, getCorrectAnswer, clickedItem]);

  useEffect(() => {
    setIsSubmitted(false);
  }, [currentItem]);

  const actions = {
    handleChange,
    handleSubmit,
  };

  const states = {
    data: slicedData,
    currentItem,
    clickedItem,
    playerName,
  };
  return (
    <div className="h-[100vh]">
      {progress === 0 ? (
        <Start
          setProgress={setProgress}
          setPlayerName={setPlayerName}
          playerName={playerName}
        />
      ) : progress === 1 ? (
        <Choices setProgress={setProgress} params={params} />
      ) : progress === 2 ? (
        <Quizzes actions={actions} states={states} />
      ) : (
        progress === 3 && isFinished && <Finish score={score} />
      )}
    </div>
  );
};

export default Home;
