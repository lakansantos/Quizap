import React, {Dispatch, SetStateAction} from "react";
import {Info, Minus, Plus} from "lucide-react";

type Props = {
  selectedNumberItems: number;
  setSelectedNumberItems: Dispatch<SetStateAction<number>>;
};

const PRESETS = [5, 10, 15, 20, 25];

const NumberItems = (props: Props) => {
  const {selectedNumberItems, setSelectedNumberItems} = props;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-tertiary rounded-full" />
          <h2 className="font-headline text-2xl font-bold">
            How Many Questions?
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full border border-outline-variant/10">
          <Info className="w-3.5 h-3.5 text-tertiary" />
          <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
            More questions = more glory!
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        {PRESETS.map((num) => (
          <button
            key={num}
            onClick={() => setSelectedNumberItems(num)}
            className={`h-14 px-8 rounded-[1rem] font-bold transition-all duration-200 cursor-pointer
              active:scale-95
              ${
                selectedNumberItems === num
                  ? "bg-tertiary-container text-on-tertiary-container font-extrabold shadow-lg shadow-tertiary/10 ring-2 ring-tertiary/20"
                  : "bg-surface-container-low text-on-surface hover:bg-surface-bright border border-outline-variant/10"
              }`}
          >
            {num}
          </button>
        ))}

        {/* Custom counter */}
        <div className="h-14 flex items-center bg-surface-container-high rounded-[1rem] px-4 gap-4 border border-outline-variant/30">
          <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">
            Custom
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setSelectedNumberItems((prev) => Math.max(1, prev - 1))
              }
              aria-label="Decrease questions"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-bright transition-colors cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-headline font-bold text-xl w-8 text-center">
              {selectedNumberItems}
            </span>
            <button
              type="button"
              onClick={() => setSelectedNumberItems((prev) => prev + 1)}
              aria-label="Increase questions"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-bright transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberItems;
