import React from "react";
import {Zap, Star, Timer} from "lucide-react";
import {useGameplay} from "@/app/contexts/GameplayContext";

type DifficultiesProps = {
  selectedDifficulty: string | null;
  setSelectedDifficulty: (value: string | null) => void;
};

const difficulties = [
  {
    key: "easy",
    label: "Easy",
    description: "For those just starting their stellar journey.",
    bolts: 1,
    basePoints: "100",
    timer: "15s",
    color: "secondary",
    borderHover: "hover:border-secondary/30",
    bgIcon: "bg-secondary/10",
    textColor: "text-secondary",
  },
  {
    key: "medium",
    label: "Medium",
    description: "A balanced challenge for true knowledge seekers.",
    bolts: 2,
    basePoints: "200",
    timer: "20s",
    color: "primary",
    borderHover: "hover:border-primary/30",
    bgIcon: "bg-primary/10",
    textColor: "text-primary",
  },
  {
    key: "hard",
    label: "Hard",
    description: "Only for the masterminds of the galaxy.",
    bolts: 3,
    basePoints: "300",
    timer: "30s",
    color: "error",
    borderHover: "hover:border-error/30",
    bgIcon: "bg-error/10",
    textColor: "text-error",
  },
];

const Difficulties = (props: DifficultiesProps) => {
  const {selectedDifficulty, setSelectedDifficulty} = props;
  const {timerEnabled} = useGameplay();

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-8 bg-gradient-primary rounded-full" />
        <h2 className="font-headline text-2xl font-bold">Choose Difficulty</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {difficulties.map((diff) => {
          const isSelected = selectedDifficulty === diff.key;
          return (
            <button
              key={diff.key}
              onClick={() => setSelectedDifficulty(diff.key)}
              className={`group relative flex flex-col items-center p-8 rounded-[1rem] border-2
                transition-all duration-300 cursor-pointer text-center
                ${
                  isSelected
                    ? `bg-surface-container border-${diff.color} shadow-[0_0_30px_rgba(154,77,255,0.15)]`
                    : `bg-surface-container-low border-transparent ${diff.borderHover}`
                }`}
            >
              {/* Selected badge */}
              {isSelected && (
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-primary rotate-45 flex items-end justify-center pb-1.5 rounded-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-on-primary-fixed -rotate-45"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}

              <div
                className={`w-16 h-16 rounded-full ${diff.bgIcon} flex items-center justify-center mb-6
                ${isSelected ? "ring-4 ring-primary/5" : ""}`}
              >
                {Array.from({length: diff.bolts}).map((_, i) => (
                  <Zap
                    key={i}
                    className={`w-8 h-8 ${diff.textColor} ${i > 0 ? "-ml-3" : ""}`}
                    fill="currentColor"
                  />
                ))}
              </div>

              <h3 className="font-headline text-xl font-bold text-on-surface mb-2">
                {diff.label}
              </h3>
              <p className="text-on-surface-variant text-sm mb-6">
                {diff.description}
              </p>
              <div className="mt-auto flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-1">
                  <Star
                    className={`w-4 h-4 ${diff.textColor}`}
                    fill="currentColor"
                  />
                  <span className={`text-xs font-bold ${diff.textColor}`}>
                    {diff.basePoints} pts{timerEnabled ? " (up to 2x)" : ""} per
                    correct
                  </span>
                </div>
                {timerEnabled && (
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    <Timer className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold">
                      {diff.timer} per question
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Difficulties;
