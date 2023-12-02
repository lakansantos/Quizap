import BaseButton from "@/app/components/buttons/BaseButton";
import {CategoriesItems} from "@/app/types/categories";
import Image from "next/image";
import {useRouter} from "next/navigation";
import React, {Dispatch, SetStateAction} from "react";

type CategoriesPropsType = {
  categoriesItems: CategoriesItems;
  hoveredCategory: number | null;
  clickedCategory: number | null;
  setHoveredCategory: Dispatch<SetStateAction<number | null>>;
  setClickedCategory: Dispatch<SetStateAction<number | null>>;
  setSelectedCategory: (state: string | null) => void;
  setSelectedChoice: Dispatch<SetStateAction<string>>;
};
const Categories = (props: CategoriesPropsType) => {
  const {
    categoriesItems,
    hoveredCategory,
    clickedCategory,
    setHoveredCategory,
    setClickedCategory,
    setSelectedCategory,
    setSelectedChoice,
  } = props;

  const router = useRouter();
  return (
    <div className=" h-screen flex justify-evenly items-center flex-col">
      <h2 className="text-4xl">Select Category</h2>
      <div className="w-full flex flex-row items-center sm:justify-center flex-no-wrap sm:flex-wrap min-h-1/2 h-fit overflow-x-auto  gap-10">
        {categoriesItems.map((item, key) => {
          const hoveredImage = hoveredCategory === key;
          const _selectedCategory = clickedCategory === key;

          const {category, name, image_src} = item;
          return (
            <div
              key={key}
              style={{
                background:
                  hoveredImage || _selectedCategory
                    ? "rgb(30, 39, 46)"
                    : "rgb(236, 240, 241)",
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
              className={`h-[300px] min-h-[300px] min-w-[300px] flex justify-center gap-3 flex-col items-center bg-blend-darken hover:cursor-pointer ${
                (hoveredCategory || _selectedCategory) && "duration-500"
              } rounded `}
            >
              {
                <Image
                  alt={name}
                  src={image_src}
                  width={100}
                  height={100}
                  style={{
                    height: "100px",
                    width: "100px",
                    objectFit: "contain",
                  }}
                />
              }
              {/* 
              <p className={`text-4xl text-center`}>
                {hoveredImage && !_selectedCategory && category}
              </p> */}

              <p
                className={`text-2xl text-center ${
                  hoveredImage || _selectedCategory
                    ? "text-white"
                    : "text-black"
                }`}
              >
                {category}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex w-full items-center gap-3 justify-center">
        <BaseButton
          onClick={() => router.back()}
          label="Back"
          className="hover:bg-gray-200 w-[300px]"
        />
        <BaseButton
          onClick={() => setSelectedChoice("difficulties")}
          label="Next"
          defaultActive
          className="hover:bg-gray-200 w-[300px]"
        />
      </div>
    </div>
  );
};

export default Categories;
