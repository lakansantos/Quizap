import Button from "@/app/components/buttons/Button";
import React from "react";

type DifficultiesProps = {
  buttonItems: {
    label: string;
    onClick?: () => void;
    defaultActive?: boolean;
  }[];
};
const Difficulties = (props: DifficultiesProps) => {
  const {buttonItems} = props;
  return (
    <div className="h-1/3">
      <h2 className="text-center text-4xl">Select Difficulties</h2>
      <div className="flex flex-col gap-5 justify-center items-center">
        <Button buttonItems={buttonItems} />
      </div>
    </div>
  );
};

export default Difficulties;
