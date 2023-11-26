"use client";

import React from "react";

import Choices from "@/app/modules/choices/Choices";

const Page = () => {
  const params = {
    difficulty: "easy",
    categories: "science",
    limit: 5,
    test: "",
  };

  return (
    <div className="min-h-screen h-fit bg-gradient-to-bl from-[#423755] to-[#804C6F] text-white">
      <Choices params={params} />
    </div>
  );
};

export default Page;
