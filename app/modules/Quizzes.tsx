import React from "react";

type QuizzesPropsType = {
  actions: {
    handleChange: (
      choices: string[],
      key: number,
      correctAnswer: string
    ) => void;
    handleSubmit: () => void;
  };
  states: {
    data: QuestionsData[];
    currentItem: number;
    clickedItem: string | null;
    playerName: string;
  };
};
const Quizzes = (props: QuizzesPropsType) => {
  const {actions, states} = props;
  const {handleChange, handleSubmit} = actions;
  const {data, currentItem, clickedItem, playerName} = states;

  return (
    <div>
      {data.map((item, index) => {
        const {question, correctAnswer, choices} = item;

        return (
          <div key={index}>
            <div>{playerName}</div>
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
  );
};

export default Quizzes;
