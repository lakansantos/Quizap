"use client";

import React from "react";
import {usePathname, useRouter} from "next/navigation";
import {queryStringify} from "@/app/utils/http";

const Choices = () => {
  const params = {
    difficulty: "easy",
    categories: "science",
    limit: 5,
  };

  const queryParams = queryStringify(params);
  const pathname = usePathname();
  console.log(pathname);
  const router = useRouter();
  const handleSubmit = () => {
    router.push("quizzes" + "?" + queryParams);
  };
  return (
    <div className="h-[100vh]">
      <div>
        <h2>Select Category</h2>
      </div>
      <div>
        <h2>Select Difficulties</h2>
      </div>
      <div>
        <h2>Select number of items</h2>
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Choices;
