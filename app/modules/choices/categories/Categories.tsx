import {CategoriesItems} from "@/app/types/categories";
import Image from "next/image";
import React, {Dispatch, SetStateAction} from "react";
import {CheckCircle} from "lucide-react";

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
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
      {categoriesItems.map((item, key) => {
        const isHovered = hoveredCategory === key;
        const isSelected = clickedCategory === key;
        const {category, name, image_src} = item;

        return (
          <button
            key={key}
            type="button"
            onClick={() => {
              setClickedCategory(key);
              setSelectedCategory(name);
            }}
            onMouseEnter={() => setHoveredCategory(key)}
            onMouseLeave={() => {
              if (!isSelected) setHoveredCategory(null);
            }}
            aria-pressed={isSelected}
            aria-label={`Select ${category} category`}
            className={`group relative flex flex-col p-6 rounded-[1rem] cursor-pointer text-left
              transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none
              ${
                isSelected
                  ? "bg-surface-container-highest ring-2 ring-primary scale-[1.02] shadow-neon-primary"
                  : "bg-surface-container-low hover:bg-surface-container hover:-translate-y-2"
              }`}
          >
            {/* Selected checkmark */}
            {isSelected && (
              <div className="absolute top-4 right-4 text-primary">
                <CheckCircle className="w-6 h-6" fill="currentColor" />
              </div>
            )}

            {/* Category icon */}
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors
              ${isSelected || isHovered ? "bg-primary/20" : "bg-surface-container-high"}`}
            >
              <Image
                alt={category}
                src={image_src}
                width={36}
                height={36}
                className="object-contain"
              />
            </div>

            <h3 className="text-xl font-bold font-headline mb-2">{category}</h3>
          </button>
        );
      })}
    </section>
  );
};

export default Categories;
