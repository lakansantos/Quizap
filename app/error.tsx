"use client";

import React from "react";

const Error = () => {
  return (
    <div className="h-screen">
      Something went wrong! Please try again{" "}
      <button
        className="bg-red-500 p-2 my-3 text-white"
        onClick={() => window.location.replace("/")}
      >
        Refresh!
      </button>
    </div>
  );
};

export default Error;
