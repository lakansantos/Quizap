import {API_URL_QUESTIONS} from "../constants/environment";
import {fetcher, useGetFetch} from "../utils/fetcher";

export const useGetQuestions = () => {
  const key = ["questions"];
  const url = "https://the-trivia-api.com/v2/questions";
  return useGetFetch(key, url);
};

export const getQuestion = (params: object): Promise<QuestionsData[]> =>
  fetcher("GET", API_URL_QUESTIONS, params);
