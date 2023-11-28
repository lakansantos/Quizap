"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {queryStringify} from "../../utils/http";
import {ROUTE_PATH} from "../../utils/routes";
import {categoriesItems} from "@/app/utils/strings";
import {useQuizContext} from "@/app/contexts/QuizContext";
import Button from "@/app/components/buttons/Button";

const Choices = () => {
  const router = useRouter();

  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [clickedCategory, setClickedCategory] = useState<number | null>(null);
  const {
    selectedCategory,
    selectedDifficulty,
    setSelectedDifficulty,
    setSelectedCategory,
  } = useQuizContext();

  const params = {
    difficulty: selectedDifficulty,
    categories: selectedCategory,
    limit: 5,
    test: "",
  };

  const queryParams = queryStringify(params);

  const handleSubmit = () => {
    router.push(ROUTE_PATH.QUIZZES.OVERVIEW + "?" + queryParams);
  };

  const buttonItems = [
    {
      label: "Easy",
      onClick: () => setSelectedDifficulty("easy"),
    },
    {
      label: "Medium",
      onClick: () => setSelectedDifficulty("medium"),
    },
    {
      label: "Hard",
      onClick: () => setSelectedDifficulty("hard"),
    },
  ].filter((item) => item);

  return (
    <div className="h-[1400px] max-h-fit flex flex-col">
      <div className=" h-1/2 sm:h-full flex justify-evenly items-center flex-col">
        <h2 className="text-4xl">Select Category</h2>
        <div className="w-full flex flex-row items-center sm:justify-center flex-no-wrap sm:flex-wrap min-h-1/2 h-fit overflow-x-auto">
          {categoriesItems.map((item, key) => {
            const hoveredImage = hoveredCategory === key;
            const _selectedCategory = clickedCategory === key;

            const {category, name, image_src} = item;
            return (
              <div
                key={key}
                style={{
                  background: `url(${image_src}) center/contain no-repeat ${
                    _selectedCategory || hoveredImage ? "rgba(0, 0, 0, .5)" : ""
                  }`,
                }}
                onClick={() => {
                  setHoveredCategory(key);
                  setClickedCategory(key);
                  setSelectedCategory(name);
                }}
                onMouseEnter={() => setHoveredCategory(key)}
                onMouseLeave={() => {
                  if (!_selectedCategory) {
                    setHoveredCategory(null);
                  }
                }}
                className={`h-[300px] w-[300px]  min-h-[300px] min-w-[300px] m-5 flex justify-center items-center bg-blend-darken hover:cursor-pointer duration-500 ease-in-out rounded`}
              >
                <p
                  className={`text-4xl text-center ${
                    _selectedCategory || hoveredImage ? "animate-bounce" : ""
                  }`}
                >
                  {_selectedCategory || hoveredImage ? category : ""}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-1/3">
        <h2 className="text-center text-4xl">Select Difficulties</h2>
        <div className="flex flex-col gap-5 justify-center items-center">
          <Button buttonItems={buttonItems} />
        </div>
      </div>
      <div className="h-1/3">
        <h2>Select number of items</h2>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Choices;
