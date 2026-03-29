"use client";

import React, {useRef} from "react";
import {useQuizContext} from "@/app/contexts/QuizContext";
import {useRouter} from "next/navigation";
import {Zap, LayoutGrid, BarChart3, Trophy, Settings, Play} from "lucide-react";
import {queryStringify} from "@/app/utils/http";
import Start from "./start/Start";

const Home = () => {
  const {
    playerName,
    isAuthReady,
    quizProgress,
    selectedCategory,
    selectedDifficulty,
    selectedNumberItems,
  } = useQuizContext();
  const router = useRouter();
  const entryRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    if (playerName) {
      router.push("/choices");
    } else {
      entryRef.current?.scrollIntoView({behavior: "smooth"});
    }
  };

  return (
    <div className="min-h-screen">
      {/* ===== Hero / Splash Section ===== */}
      <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-mesh overflow-hidden">
        {/* Settings Button */}
        <button
          onClick={() => router.push("/settings")}
          className="absolute top-6 right-6 z-20 p-3 rounded-full bg-surface-container/50 hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-all cursor-pointer"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Background Particles */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="particle w-1 h-1 top-1/4 left-1/4" />
          <div className="particle w-2 h-2 top-1/3 right-1/4 bg-secondary" />
          <div className="particle w-1 h-1 bottom-1/4 left-1/3 bg-tertiary" />
          <div className="particle w-1.5 h-1.5 top-1/2 right-1/3" />
          <div className="particle w-1 h-1 bottom-1/3 right-1/2 bg-primary" />
        </div>

        <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col items-center">
          {/* Branding */}
          <div className="flex flex-col items-center mb-12 text-center">
            <div className="relative mb-6">
              <div className="flex items-center justify-center bg-gradient-primary w-24 h-24 rounded-[1rem] neon-glow rotate-3 transform hover:rotate-0 transition-transform duration-500">
                <Zap className="w-12 h-12 text-surface" fill="currentColor" />
              </div>
            </div>
            <h1 className="font-headline font-extrabold text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tighter text-on-surface mb-4">
              Quiz<span className="text-primary">ap</span>
            </h1>
            <p className="font-headline text-lg md:text-2xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              {playerName
                ? `Welcome back, ${playerName}!`
                : "Test Your Knowledge. Challenge Your Friends."}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <button
              onClick={handleGetStarted}
              className="btn-primary text-xl px-12 py-5"
            >
              {playerName ? "Play Now" : "Get Started"}
            </button>
            <button
              onClick={() => router.push("/leaderboard")}
              className="btn-secondary text-xl px-8 py-5"
            >
              View Leaderboard
            </button>
          </div>

          {/* Resume Quiz Button */}
          {quizProgress && (
            <button
              onClick={() => {
                const params = queryStringify({
                  difficulty: selectedDifficulty,
                  categories: selectedCategory,
                  limit: selectedNumberItems,
                  test: "",
                });
                router.push("/quizzes?" + params);
              }}
              className="flex items-center gap-3 px-8 py-4 mb-8 rounded-[1rem] bg-secondary/10 border border-secondary/30 hover:bg-secondary/20 transition-all cursor-pointer group"
            >
              <Play className="w-5 h-5 text-secondary" fill="currentColor" />
              <span className="font-headline font-bold text-secondary">
                Resume Quiz
              </span>
              <span className="text-on-surface-variant text-sm">
                ({quizProgress.currentItem + 1}/{quizProgress.data.length})
              </span>
            </button>
          )}

          <div className="mb-8 md:mb-12" />

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl px-2">
            <div className="card flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <LayoutGrid className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-headline font-bold text-2xl mb-2">
                10 Categories
              </h3>
              <p className="text-on-surface-variant font-medium">
                From quantum physics to pop culture, we have it all.
              </p>
            </div>

            <div className="card flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-headline font-bold text-2xl mb-2">
                3 Difficulty Levels
              </h3>
              <p className="text-on-surface-variant font-medium">
                Casual player or trivia master? Choose your path.
              </p>
            </div>

            <div className="card flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-tertiary/10 flex items-center justify-center mb-6">
                <Trophy className="w-8 h-8 text-tertiary" />
              </div>
              <h3 className="font-headline font-bold text-2xl mb-2">
                Track Your Scores
              </h3>
              <p className="text-on-surface-variant font-medium">
                Visualized progress charts and lifetime stats.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-on-surface-variant/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse-glow" />
          </div>
        </div>
      </main>

      {/* ===== Player Entry Section (only for new users) ===== */}
      {isAuthReady && !playerName && (
        <div ref={entryRef}>
          <Start />
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 text-center text-on-surface-variant/40 text-sm font-label tracking-widest uppercase bg-surface">
        &copy; 2024 Lakan Santos
      </footer>
    </div>
  );
};

export default Home;
