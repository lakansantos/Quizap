"use client";
import React, {useEffect, useState, useCallback} from "react";
import {useRouter} from "next/navigation";
import {Trophy, Flame, Check, X, Sparkles, ChevronRight} from "lucide-react";

import {ROUTE_PATH} from "../../utils/routes";
import {useQuizContext} from "@/app/contexts/QuizContext";

type Props = {
  data?: QuestionsData[];
};

const Quizzes = (props: Props) => {
  const {data = []} = props;
  const {
    setScore,
    isFinished,
    setIsFinished,
    selectedCategory,
    selectedDifficulty,
    addQuizResult,
    saveQuizResult,
  } = useQuizContext();

  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const [currentItem, setCurrentItem] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);

  const router = useRouter();

  const handleSelectAnswer = (choice: string) => {
    if (showFeedback) return;
    setClickedItem(choice);
  };

  const handleSubmit = useCallback(() => {
    if (!clickedItem || showFeedback) return;

    const currentQuestion = data[currentItem];
    const correct = clickedItem === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore((prev) => prev + 1);
      setCorrectCount((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  }, [clickedItem, showFeedback, data, currentItem, setScore]);

  const handleNextQuestion = useCallback(() => {
    const nextIndex = currentItem + 1;
    if (nextIndex >= data.length) {
      // Record quiz result before navigating to finish
      const result: Parameters<typeof addQuizResult>[0] = {
        score: correctCount,
        total: data.length,
        category: selectedCategory,
        difficulty: selectedDifficulty,
        date: new Date().toISOString(),
      };
      addQuizResult(result);
      saveQuizResult(result);
      setIsFinished(true);
    } else {
      setCurrentItem(nextIndex);
      setClickedItem(null);
      setShowFeedback(false);
      setIsCorrect(false);
    }
  }, [
    currentItem,
    data.length,
    setIsFinished,
    addQuizResult,
    saveQuizResult,
    correctCount,
    selectedCategory,
    selectedDifficulty,
  ]);

  useEffect(() => {
    if (isFinished) router.push(ROUTE_PATH.FINISH.OVERVIEW);
  }, [isFinished, router]);

  if (!data.length || currentItem >= data.length) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-pulse text-on-surface-variant font-headline text-xl">
          Loading results...
        </div>
      </div>
    );
  }

  const progress = ((currentItem + 1) / data.length) * 100;
  const currentQuestion = data[currentItem];
  const {question, correctAnswer, choices} = currentQuestion;

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body">
      {/* Ambient glows */}
      <div
        className="fixed top-[-10%] right-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Header */}
      <header className="w-full bg-surface-container-low sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center px-6 h-16">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold tracking-tighter text-primary font-headline">
              Quizap
            </span>
            {selectedCategory && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full">
                <span className="text-xs font-bold font-headline text-secondary uppercase tracking-wider">
                  {selectedCategory.replace(/_/g, " ")}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold font-headline">
                {correctCount}/{data.length}{" "}
                <span className="text-on-surface-variant font-medium hidden sm:inline">
                  correct
                </span>
              </span>
            </div>
            {streak >= 2 && (
              <div className="flex items-center gap-1.5 bg-tertiary-container/10 px-3 py-1.5 rounded-full border border-tertiary/20">
                <Flame className="w-4 h-4 text-tertiary" fill="currentColor" />
                <span className="text-sm font-bold font-headline text-tertiary">
                  {streak} streak
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 py-8 flex flex-col items-center">
        {/* Progress */}
        <div className="w-full max-w-3xl mb-12">
          <div className="flex justify-between items-end mb-3">
            <h2 className="text-sm font-bold text-on-surface-variant font-headline uppercase tracking-[0.2em]">
              Question {currentItem + 1} of {data.length}
            </h2>
            <div className="flex gap-1.5">
              {data.map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i < currentItem
                      ? "w-2.5 bg-secondary shadow-[0_0_10px_rgba(93,249,239,0.5)]"
                      : i === currentItem
                        ? "w-6 bg-primary ring-4 ring-primary/20"
                        : "w-2.5 bg-surface-variant"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
              style={{width: `${progress}%`}}
            />
          </div>
        </div>

        {/* Question */}
        <section className="w-full max-w-4xl text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline leading-tight tracking-tight text-on-surface mb-4">
            {currentItem + 1}. {question.text}
          </h1>
        </section>

        {/* Answer Options */}
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {choices.map((choice, key) => {
            const isSelected = clickedItem === choice;
            const letter = String.fromCharCode(65 + key);
            const isCorrectAnswer = choice === correctAnswer;

            // Determine answer state styling
            let answerStyle = "";
            if (showFeedback) {
              if (isSelected && isCorrect) {
                // User selected the correct answer
                answerStyle =
                  "bg-secondary-container border-2 border-secondary shadow-[0_0_20px_rgba(93,249,239,0.2)] scale-[1.02]";
              } else if (isSelected && !isCorrect) {
                // User selected wrong answer
                answerStyle = "bg-error-container/40 border-2 border-error-dim";
              } else if (!isSelected && isCorrectAnswer) {
                // Show the correct answer when user got it wrong
                answerStyle =
                  "bg-secondary/10 border-2 border-secondary/50 border-dashed";
              } else {
                // Other unselected answers
                answerStyle =
                  "bg-surface-container opacity-40 cursor-not-allowed";
              }
            } else if (isSelected) {
              // Pre-submit selected state
              answerStyle =
                "bg-gradient-to-br from-primary to-primary-dim shadow-[0_10px_30px_rgba(148,70,249,0.3)] ring-2 ring-primary -translate-y-1";
            } else {
              // Default unselected
              answerStyle =
                "bg-surface-container-low border border-transparent hover:bg-surface-container hover:-translate-y-1 cursor-pointer";
            }

            return (
              <button
                key={key}
                onClick={() => handleSelectAnswer(choice)}
                disabled={showFeedback}
                className={`group w-full flex items-center p-5 rounded-[1rem] text-left
                  transition-all duration-300 ${answerStyle}`}
              >
                {/* Letter circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold font-headline transition-colors
                  ${
                    showFeedback && isSelected && isCorrect
                      ? "bg-secondary text-on-secondary"
                      : showFeedback && isSelected && !isCorrect
                        ? "bg-error-dim text-on-error"
                        : showFeedback && isCorrectAnswer
                          ? "border-2 border-secondary text-secondary"
                          : isSelected && !showFeedback
                            ? "bg-white/20 text-white"
                            : "bg-surface-variant text-on-surface-variant group-hover:text-primary"
                  }`}
                >
                  {showFeedback && isSelected && isCorrect ? (
                    <Check className="w-5 h-5" strokeWidth={3} />
                  ) : showFeedback && isSelected && !isCorrect ? (
                    <X className="w-5 h-5" strokeWidth={3} />
                  ) : showFeedback && isCorrectAnswer ? (
                    <Check className="w-5 h-5" strokeWidth={3} />
                  ) : (
                    letter
                  )}
                </div>

                {/* Answer text */}
                <span
                  className={`ml-6 text-lg md:text-xl font-bold font-headline
                  ${
                    showFeedback && isSelected && isCorrect
                      ? "text-on-secondary-container"
                      : showFeedback && isSelected && !isCorrect
                        ? "text-on-error-container"
                        : showFeedback && isCorrectAnswer
                          ? "text-secondary"
                          : isSelected && !showFeedback
                            ? "text-white"
                            : "text-on-surface"
                  }`}
                >
                  {choice}
                </span>

                {/* Letter label on right */}
                {showFeedback && !isSelected && !isCorrectAnswer && (
                  <span className="ml-auto text-on-surface-variant opacity-20 font-bold">
                    {letter}
                  </span>
                )}

                {/* Selected check (pre-feedback) */}
                {isSelected && !showFeedback && (
                  <div className="ml-auto flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-on-primary-fixed shadow-[0_0_15px_rgba(93,249,239,0.6)]">
                    <Check className="w-5 h-5" strokeWidth={3} />
                  </div>
                )}

                {/* Correct answer label (feedback) */}
                {showFeedback && isSelected && isCorrect && (
                  <span className="ml-auto text-on-secondary-container font-bold">
                    {letter}
                  </span>
                )}
                {showFeedback && isSelected && !isCorrect && (
                  <span className="ml-auto text-on-error-container font-bold">
                    {letter}
                  </span>
                )}
                {showFeedback && !isSelected && isCorrectAnswer && (
                  <span className="ml-auto text-secondary opacity-50 font-bold">
                    {letter}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Overlay Panel */}
        {showFeedback && (
          <div
            className="w-full max-w-2xl mt-8"
            role="status"
            aria-live="assertive"
          >
            <div
              className={`glass-card rounded-[1rem] p-6 flex items-center justify-between
              ${isCorrect ? "border-t-4 border-secondary" : "border-t-4 border-error-dim"}`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center
                  ${isCorrect ? "bg-secondary/20 text-secondary" : "bg-error-dim/20 text-error-dim"}`}
                >
                  {isCorrect ? (
                    <Sparkles className="w-7 h-7" />
                  ) : (
                    <X className="w-7 h-7" />
                  )}
                </div>
                <div>
                  <h4
                    className={`text-xl font-bold font-headline ${isCorrect ? "text-secondary" : "text-error-dim"}`}
                  >
                    {isCorrect
                      ? streak >= 3
                        ? "You're on fire!"
                        : "Correct!"
                      : "Almost!"}
                  </h4>
                  <p className="text-sm text-on-surface-variant">
                    {isCorrect ? (
                      streak >= 3 ? (
                        `${streak} correct answers in a row!`
                      ) : (
                        "Great job, keep it up!"
                      )
                    ) : (
                      <>
                        The answer was{" "}
                        <span className="text-secondary font-bold">
                          {correctAnswer}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={handleNextQuestion}
                className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 cursor-pointer
                  active:scale-95 flex items-center gap-2
                  ${
                    isCorrect
                      ? "bg-gradient-primary text-on-primary-fixed hover:scale-[1.02] shadow-lg shadow-primary/20"
                      : "bg-surface-bright text-on-surface hover:bg-surface-variant border border-outline-variant/30"
                  }`}
              >
                {currentItem === data.length - 1 ? "See Results" : "Next"}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Footer Actions (only when NOT showing feedback) */}
        {!showFeedback && (
          <div className="w-full max-w-4xl mt-16 flex justify-between items-center">
            <button
              onClick={() => router.push("/choices")}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-on-surface-variant font-bold hover:text-on-surface transition-colors group cursor-pointer"
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
              <span>Quit Quiz</span>
            </button>

            <button
              onClick={handleSubmit}
              disabled={!clickedItem}
              className="btn-primary px-12 py-4 text-lg
                disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Submit Answer
            </button>

            <div className="w-[120px]" />
          </div>
        )}
      </main>
    </div>
  );
};

export default Quizzes;
