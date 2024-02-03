import {API_URL_QUESTIONS} from "../constants/environment";
import {fetcher} from "../utils/fetcher";

export const getQuestion = (params: object): Promise<QuestionsData[]> =>
  fetcher("GET", API_URL_QUESTIONS, params);
