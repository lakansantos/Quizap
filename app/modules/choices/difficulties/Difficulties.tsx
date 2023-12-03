import BaseButton from "@/app/components/buttons/BaseButton";
import Button from "@/app/components/buttons/Button";
import React, {Dispatch, SetStateAction} from "react";

type DifficultiesProps = {
  buttonItems: {
    label: string;
    onClick?: () => void;
    defaultActive?: boolean;
  }[];
  setSelectedChoice: Dispatch<SetStateAction<string>>;
};
const Difficulties = (props: DifficultiesProps) => {
  const {buttonItems, setSelectedChoice} = props;
  return (
    <div className="flex justify-center items-center flex-col h-1/2">
      <div className="flex justify-evenly items-center flex-col mb-4 h-full">
        <h2 className="text-center text-6xl">Difficulties</h2>
        <div className="flex flex-col gap-5 justify-center items-center">
          <Button
            buttonItems={buttonItems}
            className="w-[300px] sm:w-[1000px]"
          />
        </div>
        <div className="flex justify-center gap-3">
          <BaseButton
            onClick={() => setSelectedChoice("categories")}
            label="Back"
            className="hover:bg-gray-200 mb-8 w-[300px] sm:w-[300px] hover:bg-white"
          />
          <BaseButton
            onClick={() => setSelectedChoice("items")}
            label="Next"
            defaultActive
            className="hover:bg-gray-200 mb-8 w-[300px] sm:w-[300px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Difficulties;
