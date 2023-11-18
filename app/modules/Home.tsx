import React from "react";

type Props = {
  data: QuestionsData[];
};
const Home = (props: Props) => {
  const {data} = props;

  return (
    <div>
      {data.map((item, key) => {
        const {question, correctAnswer, incorrectAnswers} = item;

        const choices = [correctAnswer, ...incorrectAnswers];
        return (
          <div key={key}>
            <div>
              <h1>
                {key + 1} {question.text}
              </h1>
              <div>
                {choices.map((choice, key) => {
                  return (
                    <p key={key}>{`${String.fromCharCode(
                      65 + key
                    )}. ${choice}`}</p>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
