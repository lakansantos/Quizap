"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {queryStringify} from "../../utils/http";
import {ROUTE_PATH} from "../../utils/routes";

type ChoicesProps = {
  params: ParsedUrlQueryInput;
};
const Choices = (props: ChoicesProps) => {
  const {params} = props;

  const queryParams = queryStringify(params);

  const router = useRouter();
  const handleSubmit = () => {
    router.push(ROUTE_PATH.QUIZZES.OVERVIEW + "?" + queryParams);
  };

  const categoriesItems = [
    {
      category: "Music",
      image_src: "/categories/music-icon.png",
      alt: "music",
    },
    {
      category: "Sports and Leisure",
      image_src: "/categories/sports-and-leisure-icon.png",
      alt: "sports and leisure",
    },
    {
      category: "Film and TV",
      image_src: "/categories/film-and-tv-icon.png",
      alt: "Film and TV",
    },
    {
      category: "Arts and Literature",
      image_src: "/categories/arts-and-literature-icon.png",
      alt: "arts and literature",
    },
    {
      category: "History",
      image_src: "/categories/history-icon.png",
      alt: "history",
    },
    {
      category: "Society and Culture",
      image_src: "/categories/society-and-culture-icon.png",
      alt: "society and culture",
    },
    {
      category: "Science",
      image_src: "/categories/science-icon.png",
      alt: "science",
    },
    {
      category: "Geography",
      image_src: "/categories/geography-icon.png",
      alt: "geography",
    },
    {
      category: "Food and Drink",
      image_src: "/categories/food-and-drink-icon.png",
      alt: "food and drink",
    },
    {
      category: "General Knowledge",
      image_src: "/categories/general-knowledge-icon.png",
      alt: "general knowledge",
    },
  ];

  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <div className="h-[1400px] max-h-fit flex flex-col">
      <div className="h-full flex justify-evenly items-center flex-col text-white">
        <h1 className="text-5xl">Select Category</h1>
        <div className="w-full flex flex-row items-center justify-center flex-wrap min-h-1/2 h-fit">
          {categoriesItems.map((item, key) => {
            const hoveredImage = hoveredCategory === key;
            const {category, image_src} = item;
            return (
              <div
                key={key}
                style={{
                  background: `url(${image_src}) center/contain  no-repeat ${
                    hoveredImage ? "rgba(0, 0, 0, .5)" : ""
                  }`,
                }}
                onMouseEnter={() => setHoveredCategory(key)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`h-[300px] w-[300px] m-5 flex justify-center items-center bg-blend-darken hover:cursor-pointer`}
              >
                <p className="text-4xl text-center">
                  {hoveredImage ? category : ""}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-1/3">
        <h2>Select Difficulties</h2>
      </div>
      <div className="h-1/3">
        <h2>Select number of items</h2>
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Choices;
