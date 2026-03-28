"use client";

import React from "react";
import {Volume2, VolumeX} from "lucide-react";
import {useMusic} from "@/app/contexts/MusicContext";

const MusicToggle = () => {
  const {isPlaying, toggle} = useMusic();

  return (
    <button
      onClick={toggle}
      aria-label={isPlaying ? "Mute music" : "Play music"}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg ${
        isPlaying
          ? "bg-primary text-on-primary-fixed neon-glow"
          : "bg-surface-container-high text-on-surface-variant border border-outline-variant/20 hover:bg-surface-bright"
      }`}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5" />
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
    </button>
  );
};

export default MusicToggle;
