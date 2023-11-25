"use client";

import React from "react";
import Finish from "../../modules/Finish/Finish";

const page = ({searchParams}: {searchParams: {score: string}}) => {
  const {score} = searchParams;
  return (
    <div className="h-[100vh]">
      <Finish score={Number(score)} />
    </div>
  );
};

export default page;
