import React from "react";
import Quizzes from "../../modules/Quizzes";
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
    <div className="h-[100vh]">
      <Quizzes data={data} />
    </div>
  );
};

export default Page;
