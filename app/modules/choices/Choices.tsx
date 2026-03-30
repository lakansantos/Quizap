"use client";

import React, {useState, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";

import {queryStringify} from "../../utils/http";
import {ROUTE_PATH} from "../../utils/routes";

import {categoriesItems} from "@/app/utils/strings";
import {useQuizContext} from "@/app/contexts/QuizContext";
import Categories from "./categories/Categories";
import Difficulties from "./difficulties/Difficulties";
import NumberItems from "./number_of_items/NumberItems";

const STEPS = ["categories", "settings"] as const;
type Step = (typeof STEPS)[number];

const Choices = () => {
  const router = useRouter();
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [clickedCategory, setClickedCategory] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>("categories");

  const {
    playerName,
    isAuthReady,
    selectedCategory,
    selectedDifficulty,
    selectedNumberItems,
    setSelectedDifficulty,
    setSelectedCategory,
    setSelectedNumberItems,
  } = useQuizContext();

  const numberItemsRef = useRef<HTMLDivElement>(null);

  // Clear previous selections on mount so user must pick fresh
  useEffect(() => {
    setSelectedCategory(null);
    setSelectedDifficulty(null);
  }, [setSelectedCategory, setSelectedDifficulty]);

  // Redirect to home if no player name
  useEffect(() => {
    if (isAuthReady && !playerName) {
      router.push("/");
    }
  }, [isAuthReady, playerName, router]);

  const params = {
    difficulty: selectedDifficulty,
    categories: selectedCategory,
    limit: selectedNumberItems,
    test: "",
  };

  const queryParams = queryStringify(params);

  const handleSubmit = () => {
    router.push(ROUTE_PATH.QUIZZES.OVERVIEW + "?" + queryParams);
  };

  const stepIndex = STEPS.indexOf(currentStep);
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Ambient background glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-secondary/5 blur-[100px] rounded-full -z-10" />

      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 w-full">
        <button
          onClick={() => router.push("/")}
          className="text-2xl font-bold tracking-tighter text-primary font-headline hover:opacity-80 transition-opacity cursor-pointer"
        >
          Quizap
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center max-w-[1440px] mx-auto w-full px-6 py-6 pb-32">
        {/* Step Indicator */}
        <div className="w-full max-w-4xl mb-10">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-secondary font-bold text-sm tracking-widest uppercase">
                Step {stepIndex + 1} of {STEPS.length}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold font-headline mt-2 text-on-surface">
                {currentStep === "categories"
                  ? "Pick a Category"
                  : "Game Settings"}
              </h1>
              <p className="text-on-surface-variant text-lg mt-2 font-medium">
                {currentStep === "categories"
                  ? "What topic are you feeling today?"
                  : "Choose your difficulty and how many questions."}
              </p>
            </div>
            <span className="text-xs font-bold text-on-surface-variant hidden md:block">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-primary rounded-full shadow-[0_0_15px_rgba(154,77,255,0.4)] transition-all duration-500"
              style={{width: `${progress}%`}}
            />
          </div>
        </div>

        {/* Step Content */}
        {currentStep === "categories" ? (
          <Categories
            categoriesItems={categoriesItems}
            hoveredCategory={hoveredCategory}
            clickedCategory={clickedCategory}
            setHoveredCategory={setHoveredCategory}
            setClickedCategory={setClickedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        ) : (
          <div className="w-full space-y-12">
            <Difficulties
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={(value) => {
                setSelectedDifficulty(value);
                // Scroll to "How Many Questions" section after picking difficulty on mobile
                setTimeout(() => {
                  numberItemsRef.current?.scrollIntoView({behavior: "smooth"});
                }, 100);
              }}
            />
            <div ref={numberItemsRef}>
              <NumberItems
                selectedNumberItems={selectedNumberItems}
                setSelectedNumberItems={setSelectedNumberItems}
              />
            </div>
          </div>
        )}
      </main>

      {/* Fixed Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 w-full bg-surface/80 backdrop-blur-xl h-20 flex items-center px-6 md:px-10 z-50 border-t border-outline-variant/10">
        <div className="max-w-[1440px] w-full mx-auto flex justify-between items-center">
          <button
            onClick={() => {
              if (currentStep === "categories") {
                router.push("/");
              } else {
                window.scrollTo(0, 0);
                setCurrentStep("categories");
              }
            }}
            className="group flex items-center gap-2 px-6 py-3 rounded-[1rem] text-on-surface-variant hover:text-on-surface transition-all cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span className="font-bold font-headline text-sm uppercase tracking-widest">
              Back
            </span>
          </button>

          <button
            onClick={() => {
              if (currentStep === "categories") {
                if (selectedCategory) {
                  window.scrollTo(0, 0);
                  setCurrentStep("settings");
                }
              } else {
                handleSubmit();
              }
            }}
            disabled={
              currentStep === "categories"
                ? !selectedCategory
                : !selectedDifficulty
            }
            className="btn-primary h-14 px-10 flex items-center gap-3 text-lg uppercase tracking-tight
              disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <span className="font-black font-headline">
              {currentStep === "settings" ? "Start Quiz!" : "Next"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Choices;
