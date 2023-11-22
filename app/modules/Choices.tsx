"use client";

import React from "react";
import {useRouter} from "next/navigation";
type ChoicesPropsType = {
  setProgress: (state: number) => void;
  params: {
    categories: string;
    difficulty: string;
    limit: number;
  };
};
const Choices = (props: ChoicesPropsType) => {
  const {setProgress, params} = props;

  const {difficulty, categories, limit} = params;

  const router = useRouter();
  const handleSubmit = () => {
    router.push(
      `/?difficulty=${difficulty}&categories=${categories}&limit=${limit}`
    );
    setProgress(2);
  };
  return (
    <div>
      <div>
        <h2>Select Category</h2>
      </div>
      <div>
        <h2>Select Difficulties</h2>
      </div>
      <div>
        <h2>Select number of items</h2>
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Choices;
