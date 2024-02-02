import {useGetFetch} from "../utils/fetcher";

export const useGetQuestions = () => {
  const key = ["questions"];
  const url = "https://the-trivia-api.com/v2/questions";
  return useGetFetch(key, url);
};
