type ParsedUrlQuery = import("querystring").ParsedUrlQuery;
type ParsedUrlQueryInput = import("querystring").ParsedUrlQueryInput;

type QuestionsData = {
  category: string;
  id: string;
  tags: string[];
  difficulty: string;
  regions: string[];
  isNiche: boolean;
  question: {text: string};
  correctAnswer: string;
  incorrectAnswers: string[];
  type: string;
  choices: string[];
};

type Meta = {
  limit: number;
  next_key: string;
  offset: number;
  order: "DESC" | "ASC";
  order_by: string;
  total_pages: number;
  total_rows: number;
  total_paginated_rows?: number;
};
