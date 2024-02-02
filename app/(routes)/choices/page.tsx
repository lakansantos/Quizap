"use client";

import React from "react";

import Choices from "@/app/modules/choices/Choices";
import {useGetQuestions} from "@/app/fetches/fetches";

const Page = () => {
  const {data} = useGetQuestions();
  console.log(data);
  return (
    <div className="min-h-screen h-fit bg-gradient-to-bl from-[#423755] to-[#804C6F] text-white">
      <Choices />
    </div>
  );
};

export default Page;
