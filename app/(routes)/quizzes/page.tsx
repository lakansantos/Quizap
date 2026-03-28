import React from "react";
import Quizzes from "@/app/modules/quizzes/Quizzes";
import {getRandomQuestions} from "../../hooks/useGetRandomQuestions";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    limit: number;
    categories: string;
    difficulty: string;
  }>;
}) => {
  const resolvedParams = await searchParams;
  const data = await getRandomQuestions(resolvedParams);

  return (
    <div className="h-screen">
      <Quizzes data={data} />
    </div>
  );
};

export default Page;
