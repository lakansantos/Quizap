import {useGetRandomQuestions} from "./hooks/useGetRandomQuestions";
import Home from "./modules/Home";

export default async function Page() {
  const params = {
    difficulties: "easy",
    categories: "science",
  };
  const data = await useGetRandomQuestions(params);

  return <Home data={data} />;
}
