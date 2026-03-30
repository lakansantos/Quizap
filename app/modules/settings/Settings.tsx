"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {useQuizContext} from "@/app/contexts/QuizContext";
import {useMusic} from "@/app/contexts/MusicContext";
import {useTheme, ACCENT_COLORS} from "@/app/contexts/ThemeContext";
import {useGameplay} from "@/app/contexts/GameplayContext";
import {
  Gamepad2,
  Palette,
  Volume2,
  User,
  ChevronLeft,
  AlertTriangle,
} from "lucide-react";

type Section = "gameplay" | "appearance" | "sound" | "profile";

const NAV_ITEMS: {key: Section; label: string; icon: React.ReactNode}[] = [
  {key: "gameplay", label: "Gameplay", icon: <Gamepad2 className="w-5 h-5" />},
  {
    key: "appearance",
    label: "Appearance",
    icon: <Palette className="w-5 h-5" />,
  },
  {
    key: "sound",
    label: "Sound & Effects",
    icon: <Volume2 className="w-5 h-5" />,
  },
  {key: "profile", label: "Profile", icon: <User className="w-5 h-5" />},
];

const Toggle = ({
  enabled,
  onToggle,
  label,
}: {
  enabled: boolean;
  onToggle: () => void;
  label: string;
}) => (
  <button
    onClick={onToggle}
    role="switch"
    aria-checked={enabled}
    aria-label={label}
    className={`w-14 h-8 rounded-full relative transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
      enabled ? "bg-primary" : "bg-surface-variant"
    }`}
  >
    <span
      className={`absolute top-1 w-6 h-6 rounded-full transition-all ${
        enabled ? "right-1 bg-on-primary-fixed" : "left-1 bg-outline"
      }`}
    />
  </button>
);

const Settings = () => {
  const router = useRouter();
  const {
    playerName,
    setPlayerName,
    updatePlayerNameInDB,
    hasPlayedBefore,
    setScore,
    setIsFinished,
    setSelectedCategory,
    setSelectedDifficulty,
    setSelectedNumberItems,
  } = useQuizContext();

  const {
    isPlaying: musicEnabled,
    setPlaying: setMusicEnabled,
    volume: musicVolume,
    setVolume: setMusicVolume,
  } = useMusic();
  const {theme, setTheme, accent, setAccent} = useTheme();
  const {
    timerEnabled,
    setTimerEnabled,
    autoAdvance,
    setAutoAdvance,
    showCorrectAnswer,
    setShowCorrectAnswer,
  } = useGameplay();

  const [activeSection, setActiveSection] = useState<Section>("gameplay");
  const [confetti, setConfetti] = useState(true);
  const [vibration, setVibration] = useState(false);
  const [displayName, setDisplayName] = useState(playerName || "");

  const handleResetScores = () => {
    setScore(0);
    setIsFinished(false);
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setSelectedNumberItems(5);
  };

  const handleSave = async () => {
    const trimmedName = displayName.trim();
    if (trimmedName) {
      setPlayerName(trimmedName);
      updatePlayerNameInDB(trimmedName);
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body">
      {/* Header */}
      <header className="bg-surface fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center p-2 rounded-full hover:bg-surface-container transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => router.push("/")}
            className="text-2xl font-bold tracking-tighter text-primary font-headline hover:opacity-80 transition-opacity cursor-pointer"
          >
            Quizap
          </button>
        </div>
      </header>

      <main className="pt-24 pb-32 px-4 flex justify-center items-start min-h-screen">
        <div className="w-full max-w-4xl bg-surface-container-low rounded-[1rem] overflow-hidden flex flex-col md:flex-row shadow-2xl">
          {/* Sidebar Navigation (Desktop) */}
          <aside className="w-full md:w-64 bg-surface-container p-6 hidden md:block">
            <div className="flex items-center gap-3 mb-8">
              <Gamepad2 className="w-7 h-7 text-primary" />
              <h1 className="font-headline text-2xl font-bold">Settings</h1>
            </div>
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left font-bold transition-all cursor-pointer ${
                    activeSection === item.key
                      ? "bg-primary text-on-primary-container"
                      : "text-on-surface-variant hover:bg-surface-bright"
                  }`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Mobile tab bar */}
          <div className="md:hidden flex overflow-x-auto border-b border-outline-variant/10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`flex-1 min-w-fit flex items-center justify-center gap-2 px-4 py-4 text-sm font-bold whitespace-nowrap cursor-pointer ${
                  activeSection === item.key
                    ? "text-primary border-b-2 border-primary"
                    : "text-on-surface-variant"
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 p-6 md:p-10 space-y-12">
            {/* Gameplay */}
            {activeSection === "gameplay" && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-[0.75rem] bg-primary/10">
                    <Gamepad2 className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-headline text-xl font-bold">Gameplay</h2>
                </div>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 bg-surface-container rounded-[1rem] ghost-border hover:bg-surface-bright transition-colors">
                    <div>
                      <p className="font-bold">Timer Toggle</p>
                      <p className="text-xs text-on-surface-variant">
                        Enable time limits for questions
                      </p>
                    </div>
                    <Toggle
                      enabled={timerEnabled}
                      onToggle={() => setTimerEnabled(!timerEnabled)}
                      label="Timer toggle"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-surface-container rounded-[1rem] ghost-border">
                    <p className="font-bold">Auto-advance</p>
                    <Toggle
                      enabled={autoAdvance}
                      onToggle={() => setAutoAdvance(!autoAdvance)}
                      label="Auto-advance"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-surface-container rounded-[1rem] ghost-border">
                    <p className="font-bold">Show correct answer</p>
                    <Toggle
                      enabled={showCorrectAnswer}
                      onToggle={() => setShowCorrectAnswer(!showCorrectAnswer)}
                      label="Show correct answer"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Appearance */}
            {activeSection === "appearance" && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-[0.75rem] bg-secondary/10">
                    <Palette className="w-5 h-5 text-secondary" />
                  </div>
                  <h2 className="font-headline text-xl font-bold">
                    Appearance
                  </h2>
                </div>
                <div className="grid gap-4">
                  <div className="p-4 bg-surface-container rounded-[1rem] ghost-border">
                    <p className="font-bold mb-3">Theme Mode</p>
                    <div className="flex bg-surface-container-low p-1 rounded-xl">
                      {(
                        [
                          {key: "light", label: "Light"},
                          {key: "dark", label: "Dark"},
                          {key: "system", label: "System"},
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.key}
                          onClick={() => setTheme(opt.key)}
                          className={`flex-1 py-2 flex items-center justify-center gap-2 rounded-[0.75rem] text-xs font-bold cursor-pointer transition-all ${
                            theme === opt.key
                              ? "bg-surface-bright text-on-surface shadow-sm"
                              : "text-on-surface-variant hover:text-on-surface"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-surface-container rounded-[1rem] ghost-border">
                    <p className="font-bold mb-3">Color Accent</p>
                    <div className="flex gap-4">
                      {ACCENT_COLORS.map((c) => (
                        <button
                          key={c.key}
                          onClick={() => setAccent(c.key)}
                          className={`w-8 h-8 rounded-full cursor-pointer transition-all ${
                            accent === c.key
                              ? "ring-4 ring-offset-4 ring-offset-surface-container scale-110"
                              : "hover:scale-110"
                          }`}
                          style={{
                            backgroundColor: c.color,
                            boxShadow:
                              accent === c.key
                                ? `0 0 0 4px var(--color-surface-container), 0 0 0 8px ${c.color}50`
                                : undefined,
                          }}
                          aria-label={`${c.key} accent`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Sound & Effects */}
            {activeSection === "sound" && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-[0.75rem] bg-tertiary/10">
                    <Volume2 className="w-5 h-5 text-tertiary" />
                  </div>
                  <h2 className="font-headline text-xl font-bold">
                    Sound & Effects
                  </h2>
                </div>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 bg-surface-container rounded-[1rem] ghost-border">
                    <div>
                      <p className="font-bold">Background Music</p>
                      <p className="text-xs text-on-surface-variant">
                        Ambient lo-fi music while playing
                      </p>
                    </div>
                    <Toggle
                      enabled={musicEnabled}
                      onToggle={() => setMusicEnabled(!musicEnabled)}
                      label="Background music"
                    />
                  </div>
                  <div className="p-4 bg-surface-container rounded-[1rem] ghost-border">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-bold">Volume</p>
                      <span className="text-sm font-bold text-primary">
                        {musicVolume}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={musicVolume}
                      onChange={(e) => setMusicVolume(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-variant accent-primary"
                    />
                    <div className="flex justify-between text-[10px] text-on-surface-variant font-bold mt-1">
                      <span>Mute</span>
                      <span>Max</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-surface-container rounded-[1rem] ghost-border">
                    <p className="font-bold">Confetti animations</p>
                    <Toggle
                      enabled={confetti}
                      onToggle={() => setConfetti(!confetti)}
                      label="Confetti animations"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-surface-container rounded-[1rem] ghost-border">
                    <p className="font-bold">Vibration</p>
                    <Toggle
                      enabled={vibration}
                      onToggle={() => setVibration(!vibration)}
                      label="Vibration"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Profile */}
            {activeSection === "profile" && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-[0.75rem] bg-primary-fixed/10">
                    <User className="w-5 h-5 text-primary-fixed" />
                  </div>
                  <h2 className="font-headline text-xl font-bold">Profile</h2>
                </div>
                <div className="grid gap-6">
                  {hasPlayedBefore ? (
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="input-field"
                      />
                    </div>
                  ) : (
                    <div className="p-4 bg-surface-container rounded-[1rem] ghost-border">
                      <p className="text-sm text-on-surface-variant">
                        Play a game first to set your display name on the
                        leaderboard.
                      </p>
                    </div>
                  )}
                  <div className="p-6 bg-error-container/10 rounded-[1rem] border border-error-container/20 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-error flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Danger Zone
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Permanently reset all scores and progress.
                      </p>
                    </div>
                    <button
                      onClick={handleResetScores}
                      className="px-6 py-2 rounded-[0.75rem] border border-error text-error text-sm font-bold hover:bg-error hover:text-on-error transition-all cursor-pointer whitespace-nowrap"
                    >
                      Reset scores
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Save Footer */}
            <footer className="pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row gap-4 justify-end">
              <button
                onClick={() => router.back()}
                className="px-8 py-3 rounded-xl text-on-surface-variant font-bold hover:text-on-surface transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary px-10 py-3">
                Save Changes
              </button>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
