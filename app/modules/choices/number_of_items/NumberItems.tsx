import BaseButton from "@/app/components/buttons/BaseButton";
import React, {Dispatch, SetStateAction} from "react";

type Props = {
  setSelectedNumberItems: Dispatch<SetStateAction<number>>;
  handleSubmit: () => void;
  setSelectedChoice: Dispatch<SetStateAction<string>>;
};
const NumberItems = (props: Props) => {
  const {setSelectedNumberItems, handleSubmit, setSelectedChoice} = props;

  return (
    <div className="h-1/2 mb-3 flex flex-col justify-center items-center gap-5">
      <h2 className="text-center text-6xl">Number of items</h2>
      <input
        type="number"
        min={0}
        onChange={(e) => setSelectedNumberItems(Number(e.target.value))}
        className="w-[300px] sm:w-[1000px] p-3 text-black"
        placeholder="Enter number of items"
      />

      <div className="flex justify-center gap-3">
        <BaseButton
          onClick={() => setSelectedChoice("difficulties")}
          label="Back"
          className="hover:bg-gray-200 mb-8 w-[300px] hover:bg-white"
        />
        <BaseButton
          onClick={handleSubmit}
          label="Submit"
          defaultActive
          className="hover:bg-gray-200 mb-8 w-[300px]"
        />
      </div>
    </div>
  );
};

export default NumberItems;
