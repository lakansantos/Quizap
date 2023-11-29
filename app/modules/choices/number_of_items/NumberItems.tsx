import React, {Dispatch, SetStateAction} from "react";

type Props = {
  setSelectedNumberItems: Dispatch<SetStateAction<number>>;
};
const NumberItems = (props: Props) => {
  const {setSelectedNumberItems} = props;
  return (
    <div className="h-1/12 mb-3 flex flex-col justify-center items-center gap-3">
      <h2 className="text-center text-4xl">Number of items</h2>
      <input
        type="number"
        min={0}
        onChange={(e) => setSelectedNumberItems(Number(e.target.value))}
        className="w-[300px] sm:w-[1000px] p-3 text-black"
        placeholder="Enter number of items"
      />
    </div>
  );
};

export default NumberItems;
