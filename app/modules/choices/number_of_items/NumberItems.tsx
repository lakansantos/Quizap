import BaseButton from "@/app/components/buttons/BaseButton";
import React, {Dispatch, SetStateAction, useState} from "react";

type Props = {
  setSelectedNumberItems: Dispatch<SetStateAction<number>>;
  handleSubmit: () => void;
  setSelectedChoice: Dispatch<SetStateAction<string>>;
};
const NumberItems = (props: Props) => {
  const {setSelectedNumberItems, handleSubmit, setSelectedChoice} = props;

  const [value, setValue] = useState<number | null>(null);

  return (
    <div className="h-full mb-3 flex flex-col justify-center items-center gap-3">
      <h2 className="text-center text-4xl">Number of items</h2>
      <input
        type="number"
        min={0}
        value={value !== null || value === 0 ? value : ""}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (!!value && value < 0) {
            setValue(value * -1);
          } else {
            setValue(value);
          }
          setSelectedNumberItems(value);
        }}
        className="w-[300px] sm:w-[1000px] p-3 text-black"
        placeholder="Enter number of items"
      />

      <div className="flex justify-center gap-3">
        <BaseButton
          onClick={() => setSelectedChoice("difficulties")}
          label="Back"
          className="hover:bg-gray-200 mb-8 w-[300px]"
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
