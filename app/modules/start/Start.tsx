"use client";

import {useQuizContext} from "@/app/contexts/QuizContext";
import {supabase} from "@/app/utils/supabase";
import {useRouter} from "next/navigation";
import React, {useState, SyntheticEvent} from "react";
import {Play, Sparkles, HelpCircle, Lightbulb, Star} from "lucide-react";

const Start = () => {
  const router = useRouter();
  const {playerId, setPlayerName} = useQuizContext();
  const [nameInput, setNameInput] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    setPlayerName(trimmed);
    if (playerId) {
      await supabase.from("players").upsert({id: playerId, name: trimmed});
    }
    router.push("/choices");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-surface overflow-hidden">
      {/* Floating background icons */}
      <div className="absolute top-1/4 left-10 text-primary-dim/20 animate-float-slow">
        <HelpCircle className="w-16 h-16 md:w-24 md:h-24" />
      </div>
      <div className="absolute bottom-1/4 right-10 text-tertiary/20 animate-float-medium">
        <Lightbulb className="w-20 h-20 md:w-28 md:h-28" />
      </div>
      <div className="absolute top-1/3 right-1/4 text-secondary/20 animate-float-fast">
        <Star className="w-12 h-12 md:w-16 md:h-16" fill="currentColor" />
      </div>
      <div className="absolute bottom-1/3 left-1/4 text-primary/20 animate-float-slow">
        <Sparkles className="w-14 h-14 md:w-20 md:h-20" />
      </div>

      {/* Player Entry Card */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl w-full glass-card rounded-[1rem] p-8 md:p-12 z-10 relative overflow-hidden"
      >
        {/* Top gradient accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary" />

        <div className="flex flex-col items-center text-center space-y-8">
          {/* Mascot / Icon area */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full group-hover:bg-primary/30 transition-all duration-500" />
            <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-primary flex items-center justify-center animate-float-slow neon-glow">
              <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-surface" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface">
              Hey there! What should we call you?
            </h1>
            <p className="text-on-surface-variant text-lg">
              Your adventure in Quizap starts with a name.
            </p>
          </div>

          {/* Input + Submit */}
          <div className="w-full space-y-6">
            <div className="relative group">
              <label htmlFor="player-name" className="sr-only">
                Your name
              </label>
              <input
                id="player-name"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.currentTarget.value)}
                placeholder="Enter your name..."
                className="input-field text-xl py-5 group-hover:bg-surface-container"
                autoComplete="off"
              />
              <div className="absolute inset-0 rounded-[1rem] pointer-events-none border border-primary/0 group-focus-within:border-primary/40 transition-all duration-300" />
            </div>

            <button
              type="submit"
              disabled={!nameInput.trim()}
              className="btn-primary w-full text-xl py-5 flex items-center justify-center gap-2
                disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Let&apos;s Play!
              <Play className="w-6 h-6" fill="currentColor" />
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Start;
