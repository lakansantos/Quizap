import {useGetRandomQuestions} from "./hooks/useGetRandomQuestions";
import Home from "./modules/Home";

export default async function Page() {
  const data = await useGetRandomQuestions();

  return <Home data={data} />;
}
