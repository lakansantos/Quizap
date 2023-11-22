"use client";

import React from "react";
import {useRouter} from "next/navigation";

const Choices = () => {
  const params = {
    difficulty: "easy",
    categories: "science",
    limit: 5,
  };
  const {difficulty, categories, limit} = params;

  const router = useRouter();
  const handleSubmit = () => {
    router.push(
      `/quizzes?difficulty=${difficulty}&categories=${categories}&limit=${limit}`
    );
  };
  return (
    <div className="h-[100vh]">
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
