"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";

import {queryStringify} from "../../utils/http";
import {ROUTE_PATH} from "../../utils/routes";

import {categoriesItems} from "@/app/utils/strings";
import {useQuizContext} from "@/app/contexts/QuizContext";
import Categories from "./categories/Categories";
import Difficulties from "./difficulties/Difficulties";
import NumberItems from "./number_of_items/NumberItems";

const Choices = () => {
  const router = useRouter();

  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [clickedCategory, setClickedCategory] = useState<number | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string>("categories");

  const {
    selectedCategory,
    selectedDifficulty,
    selectedNumberItems,
    setSelectedDifficulty,
    setSelectedCategory,
    setSelectedNumberItems,
  } = useQuizContext();

  const params = {
    difficulty: selectedDifficulty,
    categories: selectedCategory,
    limit: selectedNumberItems,
    test: "",
  };

  const categoriesStates = {
    hoveredCategory,
    clickedCategory,
    categoriesItems,
  };

  const categoriesActions = {
    setHoveredCategory,
    setClickedCategory,
    setSelectedCategory,
    setSelectedChoice,
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
    <div className="h-screen flex flex-col">
      {selectedChoice === "categories" ? (
        <Categories {...categoriesStates} {...categoriesActions} />
      ) : selectedChoice === "difficulties" ? (
        <Difficulties
          buttonItems={buttonItems}
          setSelectedChoice={setSelectedChoice}
        />
      ) : (
        selectedChoice === "items" && (
          <NumberItems
            setSelectedNumberItems={setSelectedNumberItems}
            handleSubmit={handleSubmit}
            setSelectedChoice={setSelectedChoice}
          />
        )
      )}
    </div>
  );
};

export default Choices;
