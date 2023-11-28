import {CategoriesItems} from "@/app/types/categories";
import React, {Dispatch, SetStateAction} from "react";

type CategoriesPropsType = {
  categoriesItems: CategoriesItems;
  hoveredCategory: number | null;
  clickedCategory: number | null;
  setHoveredCategory: Dispatch<SetStateAction<number | null>>;
  setClickedCategory: Dispatch<SetStateAction<number | null>>;
  setSelectedCategory: (state: string | null) => void;
};
const Categories = (props: CategoriesPropsType) => {
  const {
    categoriesItems,
    hoveredCategory,
    clickedCategory,
    setHoveredCategory,
    setClickedCategory,
    setSelectedCategory,
  } = props;
  return (
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
                  hoveredImage
                    ? "rgba(0, 0, 0, .5)"
                    : _selectedCategory
                    ? "rgb(236, 240, 241)"
                    : ""
                }`,
              }}
              onClick={() => {
                setHoveredCategory(key);
                setClickedCategory(key);
                setHoveredCategory(null);
                setSelectedCategory(name);
              }}
              onMouseEnter={() => setHoveredCategory(key)}
              onMouseLeave={() => {
                if (!_selectedCategory) {
                  setHoveredCategory(null);
                }
              }}
              className={`h-[300px] w-[300px]  min-h-[300px] min-w-[300px] m-5 flex justify-center items-center bg-blend-darken hover:cursor-pointer duration-500 ease-in-out rounded `}
            >
              <p
                className={`text-4xl text-center ${
                  hoveredImage ? "animate-fall" : ""
                }`}
              >
                {hoveredImage ? category : ""}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
