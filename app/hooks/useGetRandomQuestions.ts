import {getQuestion} from "../fetches/fetches";

type Params = {
  limit: number;
  categories: string;
  difficulty: string;
};

export const getRandomQuestions = async (params: Params) => {
  try {
    const data = await getQuestion(params);

    const formattedData =
      data &&
      data.map((question: QuestionsData) => {
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
