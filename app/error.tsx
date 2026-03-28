"use client";

import React from "react";

const Error = ({
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) => {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-6 px-6">
      <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-error"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h1 className="font-headline text-2xl font-bold text-on-surface">
        Something went wrong!
      </h1>
      <p className="text-on-surface-variant text-center max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <button onClick={reset} className="btn-primary">
        Try Again
      </button>
    </div>
  );
};

export default Error;
