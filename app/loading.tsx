import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-surface-container-highest border-t-primary animate-spin" />
        <span className="text-on-surface-variant font-headline font-medium text-sm tracking-widest uppercase">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loading;
