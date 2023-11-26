"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {queryStringify} from "../../utils/http";
import {ROUTE_PATH} from "../../utils/routes";
import {categoriesItems} from "@/app/utils/strings";

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

  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <div className="h-[1400px] max-h-fit flex flex-col">
      <div className="h-full flex justify-evenly items-center flex-col">
        <h1 className="text-5xl">Select Category</h1>
        <div className="w-full flex flex-row items-center justify-center flex-wrap min-h-1/2 h-fit">
          {categoriesItems.map((item, key) => {
            const hoveredImage = hoveredCategory === key;
            const {category, image_src} = item;
            return (
              <div
                key={key}
                style={{
                  background: `url(${image_src}) center/contain no-repeat ${
                    hoveredImage ? "rgba(0, 0, 0, .5)" : ""
                  }`,
                }}
                onMouseEnter={() => setHoveredCategory(key)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`h-[300px] w-[300px] m-5 flex justify-center items-center bg-blend-darken hover:cursor-pointer duration-500 ease-in-out rounded`}
              >
                <p
                  className={`text-4xl text-center ${
                    hoveredImage ? "animate-bounce" : ""
                  }`}
                >
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
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Choices;
