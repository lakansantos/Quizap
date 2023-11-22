import {useGetRandomQuestions} from "./hooks/useGetRandomQuestions";
import Home from "./modules/Home";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    limit: string;
    categories: string;
    difficulty: string;
  };
}) {
  const data = await useGetRandomQuestions(searchParams);

  return <Home data={data} />;
}
