"use client";
import React from "react";
import {useQuizContext} from "@/app/contexts/QuizContext";
import {useRouter} from "next/navigation";
import {
  CheckCircle,
  XCircle,
  Flame,
  RotateCcw,
  LayoutGrid,
  Home,
  Trophy,
  Settings,
} from "lucide-react";

const Finish = () => {
  const {
    score,
    playerName,
    selectedNumberItems,
    selectedCategory,
    selectedDifficulty,
    setScore,
    setIsFinished,
    setSelectedCategory,
    setSelectedDifficulty,
    setSelectedNumberItems,
    quizHistory,
  } = useQuizContext();

  const router = useRouter();

  const total = selectedNumberItems || 10;
  const wrong = total - score;
  const percentage = Math.round((score / total) * 100);
  const strokeDashoffset = 283 - (283 * percentage) / 100;

  // Use time-based points from the latest quiz result if available
  const lastResult = quizHistory[quizHistory.length - 1];
  const pointsEarned = lastResult?.points ?? score * 150;

  const getTitle = () => {
    if (percentage >= 90) return "Legendary!";
    if (percentage >= 70) return "Quiz Master!";
    if (percentage >= 50) return "Nice Try!";
    return "Keep Practicing!";
  };

  const handlePlayAgain = () => {
    setIsFinished(false);
    setScore(0);
    router.push("/choices");
  };

  const handleChangeCategory = () => {
    setIsFinished(false);
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setSelectedNumberItems(5);
    setScore(0);
    router.push("/choices");
  };

  const handleGoHome = () => {
    setIsFinished(false);
    setScore(0);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 w-full fixed top-0 z-50 bg-surface">
        <button
          onClick={() => router.push("/")}
          className="text-2xl font-bold tracking-tighter text-primary font-headline hover:opacity-80 transition-opacity cursor-pointer"
        >
          Quizap
        </button>
        <button
          onClick={() => router.push("/settings")}
          className="p-2 rounded-full hover:bg-surface-container transition-all cursor-pointer text-on-surface-variant hover:text-on-surface"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </header>

      <main className="pt-24 pb-32 px-4 max-w-6xl mx-auto relative">
        {/* Background particles */}
        <div
          className="absolute inset-0 overflow-hidden -z-10 opacity-40"
          aria-hidden="true"
        >
          <div className="absolute top-20 left-1/4 w-2 h-2 rounded-full bg-primary animate-pulse" />
          <div className="absolute top-40 right-1/3 w-3 h-3 rounded-full bg-secondary rotate-45" />
          <div className="absolute bottom-1/4 left-10 w-2 h-2 rounded-full bg-tertiary" />
        </div>

        {/* Quiz Complete Banner */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-container rounded-full mb-6">
            <CheckCircle
              className="w-4 h-4 text-secondary"
              aria-hidden="true"
            />
            <span className="text-sm font-bold text-on-secondary-container uppercase tracking-widest">
              Quiz Complete
            </span>
          </div>
        </div>

        {/* Greeting */}
        <div className="text-center mb-12">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Great job, {playerName || "Player"}!
          </h1>
          <p className="text-on-surface-variant font-medium">
            You completed the {selectedCategory?.replace(/_/g, " ") || "quiz"}{" "}
            quiz on {selectedDifficulty || "medium"} difficulty.
          </p>
        </div>

        {/* Hero Score Ring */}
        <div className="flex flex-col items-center mb-16">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full bg-primary/10 blur-3xl"
              aria-hidden="true"
            />
            <svg
              className="w-full h-full -rotate-90"
              role="img"
              aria-label={`Score: ${percentage}%, ${score} out of ${total} correct`}
            >
              <circle
                className="stroke-surface-container-highest"
                cx="50%"
                cy="50%"
                fill="transparent"
                r="45%"
                strokeWidth="12"
              />
              <circle
                className="stroke-primary transition-all duration-1000"
                cx="50%"
                cy="50%"
                fill="transparent"
                r="45%"
                strokeDasharray="283"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="12"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl sm:text-6xl md:text-8xl font-black font-headline text-on-surface">
                {percentage}
                <span className="text-2xl sm:text-3xl md:text-4xl text-primary">
                  %
                </span>
              </span>
              <span className="text-lg sm:text-xl font-bold text-on-surface-variant mt-2 tracking-widest uppercase">
                {score} / {total}
              </span>
            </div>
          </div>
          <div className="mt-8 px-8 py-3 bg-surface-container-highest rounded-full border border-outline-variant/20 shadow-neon-primary">
            <span className="text-secondary font-headline font-bold text-lg sm:text-xl tracking-wide uppercase italic">
              {getTitle()}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          <div className="bg-surface-container-low p-6 rounded-[1rem] flex flex-col items-center justify-center border-b-2 border-transparent hover:border-secondary transition-all">
            <CheckCircle
              className="w-6 h-6 text-secondary mb-2"
              aria-hidden="true"
            />
            <span className="text-on-surface-variant text-sm font-bold uppercase tracking-tighter">
              Correct
            </span>
            <span className="text-2xl font-headline font-extrabold text-on-surface">
              {score}
            </span>
          </div>
          <div className="bg-surface-container-low p-6 rounded-[1rem] flex flex-col items-center justify-center border-b-2 border-transparent hover:border-error transition-all">
            <XCircle className="w-6 h-6 text-error mb-2" aria-hidden="true" />
            <span className="text-on-surface-variant text-sm font-bold uppercase tracking-tighter">
              Wrong
            </span>
            <span className="text-2xl font-headline font-extrabold text-on-surface">
              {wrong}
            </span>
          </div>
          <div className="bg-surface-container-low p-6 rounded-[1rem] flex flex-col items-center justify-center border-b-2 border-transparent hover:border-tertiary transition-all">
            <Flame className="w-6 h-6 text-tertiary mb-2" aria-hidden="true" />
            <span className="text-on-surface-variant text-sm font-bold uppercase tracking-tighter">
              Points Earned
            </span>
            <span className="text-2xl font-headline font-extrabold text-on-surface">
              {pointsEarned.toLocaleString()} pts
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <button
            onClick={handlePlayAgain}
            className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-3"
          >
            Play Again
            <RotateCcw className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="flex gap-4">
            <button
              onClick={handleChangeCategory}
              className="flex-1 py-4 px-4 rounded-[1rem] bg-surface-container-high border border-outline-variant/30 text-on-surface font-bold
                hover:bg-surface-bright transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4" aria-hidden="true" />
              Change Category
            </button>
            <button
              onClick={() => {
                setIsFinished(false);
                setScore(0);
                router.push("/leaderboard");
              }}
              className="py-4 px-4 rounded-[1rem] bg-surface-container-high border border-outline-variant/30 text-on-surface font-bold
                hover:bg-surface-bright transition-colors flex items-center justify-center cursor-pointer"
              aria-label="View leaderboard"
            >
              <Trophy className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleGoHome}
            className="w-full mt-2 py-3 text-on-surface-variant font-bold text-sm hover:text-primary transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
};

export default Finish;
