"use client";
import React, {useEffect, useState} from "react";

import {useRouter} from "next/navigation";

import {ROUTE_PATH} from "../../utils/routes";
import {useQuizContext} from "@/app/contexts/QuizContext";
import BaseButton from "@/app/components/buttons/BaseButton";

type Props = {
  data?: QuestionsData[];
};

const Quizzes = (props: Props) => {
  const {data = []} = props;

  const {setScore, isFinished, setIsFinished} = useQuizContext();

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

  const lastItemSubmitted = currentItem === data.length;

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
    if (lastItemSubmitted) {
      setCurrentItem(currentItem);
      setIsFinished(true);
    }
  }, [currentItem, lastItemSubmitted, setIsFinished]);

  useEffect(() => {
    if (isFinished) router.push(ROUTE_PATH.FINISH.OVERVIEW);
  }, [isFinished, router]);

  return currentItem < data.length ? (
    <div className="h-screen flex flex-col justify-center items-center bg-zinc-900 text-white">
      {slicedData.map((item, index) => {
        const {question, correctAnswer, choices} = item;

        return (
          <div key={index} className="w-full sm:w-1/2 text-center">
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
                      className={`p-4 h-[100px] bg-none border border-white flex items-center hover:bg-white hover:text-black hover:cursor-pointer ${
                        clickedItem === choices[key]
                          ? "text-black bg-white"
                          : ""
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
      <div className="mt-2 w-full sm:w-1/2">
        <BaseButton
          label={currentItem === data.length - 1 ? "Submit" : "Next"}
          onClick={handleSubmit}
          disabled={!clickedItem}
          active
          className="text-red bg-gray-200 w-full hover:bg-gray-200 hover:cursor-pointe disabled:cursor-not-allowed"
        />
      </div>
    </div>
  ) : (
    <div className="h-screen">Loading ...</div>
  );
};

export default Quizzes;
