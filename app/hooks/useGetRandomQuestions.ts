import axios from "axios";
import {API_URL_QUESTIONS} from "../constants/environment";

export const useGetRandomQuestions = async (params?: {
  [key: string]: string;
}) => {
  try {
    const response = await axios.get(API_URL_QUESTIONS as string, {
      params: params,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
