import React from "react";

type Props = {
  data: QuestionsData[];
};
const Home = (props: Props) => {
  const {data} = props;

  return (
    <div>
      {data.map((item, key) => {
        return (
          <div key={key}>
            <ul>
              <li>{item.category}</li>
              <li>{item.question.text}</li>
              <li>{item.difficulty}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
