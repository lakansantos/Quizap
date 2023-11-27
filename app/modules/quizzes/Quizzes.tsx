"use client";
import React, {useEffect, useState} from "react";

import {useRouter} from "next/navigation";

import {ROUTE_PATH} from "../../utils/routes";
import {useQuizContext} from "@/app/contexts/QuizContext";

type Props = {
  data: QuestionsData[];
};

const Quizzes = (props: Props) => {
  const {data} = props;

  const {setScore} = useQuizContext();

  const [clickedItem, setClickedItem] = useState<string | null>(null);

  const [getCorrectAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [currentItem, setCurrentItem] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    choices: string[],
    key: number,
    correctAnswer: string
  ) => {
    setClickedItem(choices[key]);
    setCorrectAnswer(correctAnswer);
  };

  const slicedData = [data[currentItem]];

  const router = useRouter();

  const finished = currentItem === data.length;

  const handleSubmit = () => {
    setIsSubmitted(true);
    setCurrentItem(currentItem + 1);
  };

  useEffect(() => {
    if (isSubmitted && !!clickedItem && getCorrectAnswer === clickedItem) {
      setScore((prev) => prev + 1);
      setClickedItem(null);
      setIsSubmitted(false);
    }
  }, [isSubmitted, getCorrectAnswer, clickedItem, setScore]);

  useEffect(() => {
    setIsSubmitted(false);
    setClickedItem(null);
  }, [currentItem]);

  useEffect(() => {
    if (finished) {
      setCurrentItem(currentItem);

      router.push(ROUTE_PATH.FINISH.OVERVIEW);
    }
  }, [currentItem, finished, router]);

  return currentItem < data.length ? (
    <div className="h-screen">
      {slicedData.map((item, index) => {
        const {question, correctAnswer, choices, category} = item;

        return (
          <div key={index}>
            {category}
            <div>
              <h1>
                {currentItem + 1}. {question.text}
              </h1>
              <div className="flex flex-col gap-2">
                {choices.map((choice, key) => {
                  return (
                    <div
                      key={key}
                      onClick={() => {
                        handleChange(choices, key, correctAnswer);
                      }}
                      className={`p-4 h-[100px] bg-red-500 flex items-center hover:cursor-pointer ${
                        clickedItem === choices[key] ? "clicked" : ""
                      }`}
                    >
                      {`${String.fromCharCode(65 + key)}. ${choice}`}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
      <div>
        <button
          className={`bg-green-400 p-4 font-medium text-white ${
            !clickedItem ? "disabled-button" : ""
          }`}
          disabled={!clickedItem}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  ) : (
    <div className="h-screen">Loading ...</div>
  );
};

export default Quizzes;
