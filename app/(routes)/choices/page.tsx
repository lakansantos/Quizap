"use client";

import React from "react";

import Choices from "@/app/modules/Choices";

const Page = () => {
  const params = {
    difficulty: "easy",
    categories: "science",
    limit: 5,
  };

  return (
    <div className="h-[100vh]">
      <Choices params={params} />
    </div>
  );
};

export default Page;
