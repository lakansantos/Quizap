import React from "react";
import Quizzes from "@/app/modules/quizzes/Quizzes";
import {useGetRandomQuestions} from "../../hooks/useGetRandomQuestions";

const Page = async ({
  searchParams,
}: {
  searchParams: {
    limit: number;
    categories: string;
    difficulty: string;
  };
}) => {
  const data = await useGetRandomQuestions(searchParams);

  return (
    <div className="h-screen">
      <Quizzes data={data} />
    </div>
  );
};

export default Page;
