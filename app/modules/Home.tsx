"use client";
import React, {useEffect, useState} from "react";
import Quizzes from "./Quizzes";

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
  };
  return (
    <React.Fragment>
      {!isFinished ? (
        <Quizzes actions={actions} states={states} />
      ) : (
        <div>
          <h1>Congrats!</h1>
          <p>{score}</p>
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
