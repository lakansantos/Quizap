import axios from "axios";
import {API_URL_QUESTIONS} from "../constants/environment";

export const useGetRandomQuestions = async () => {
  try {
    const response = await axios.get(API_URL_QUESTIONS as string);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
