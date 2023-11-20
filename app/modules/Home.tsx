"use client";
import React, {useEffect, useState} from "react";

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

  return (
    <React.Fragment>
      {!isFinished ? (
        <div>
          {slicedData.map((item, index) => {
            const {question, correctAnswer, choices} = item;

            return (
              <div key={index}>
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
        <div>
          <h1>Congrats!</h1>
          <p>{score}</p>
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
