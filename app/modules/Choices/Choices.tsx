"use client";

import React from "react";
import {useRouter} from "next/navigation";
import {queryStringify} from "../../utils/http";
import {ROUTE_PATH} from "../../utils/routes";
import {useScoreContext} from "@/app/contexts/ScoreContext";

type ChoicesProps = {
  params: ParsedUrlQueryInput;
};
const Choices = (props: ChoicesProps) => {
  const {params} = props;

  const queryParams = queryStringify(params);
  const {playerName} = useScoreContext();
  const router = useRouter();
  const handleSubmit = () => {
    router.push(ROUTE_PATH.QUIZZES.OVERVIEW + "?" + queryParams);
  };
  return (
    <div>
      <div>
        <h1>{playerName}</h1>
        <h2>Select Category</h2>
      </div>
      <div>
        <h2>Select Difficulties</h2>
      </div>
      <div>
        <h2>Select number of items</h2>
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Choices;
