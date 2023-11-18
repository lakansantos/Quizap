import {useGetRandomQuestions} from "./hooks/useGetRandomQuestions";
import Home from "./modules/Home";

export default async function Page() {
  const params = {
    categories: "science",
    difficulties: "easy",
  };
  const data = await useGetRandomQuestions(params);

  return <Home data={data} />;
}
