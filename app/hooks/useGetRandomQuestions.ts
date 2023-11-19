import axios from "axios";
import {API_URL_QUESTIONS} from "../constants/environment";

export const useGetRandomQuestions = async (params?: {
  [key: string]: string;
}) => {
  try {
    const response = await axios.get(API_URL_QUESTIONS as string, {
      params: params,
    });

    const data = response.data;

    const formattedData = data.map((question: QuestionsData) => {
      const {correctAnswer, incorrectAnswers} = question;
      const choices = [correctAnswer, ...incorrectAnswers];

      question.choices = choices.sort(() => Math.random() - 0.5);

      return question;
    });

    return formattedData;
  } catch (error) {
    console.error(error);
  }
};
