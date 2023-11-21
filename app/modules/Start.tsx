import React from "react";

const Start = ({
  setStarted,
  setPlayerName,
  playerName,
}: {
  setStarted: (state: boolean) => void;
  setPlayerName: (state: string) => void;
  playerName: string;
}) => {
  return (
    <form className="flex w-full h-full justify-center items-center">
      <div className="flex justify-center items-center flex-col w-1/2 h-1/2 gap-5">
        <p className="text-3xl font-semibold font-sans">
          Howdy, what should I call you?
        </p>
        <input
          type="text"
          id="nameInput"
          placeholder="Enter your name"
          className="border border-black w-1/2 py-2 indent-3"
          onChange={(e) => setPlayerName(e.currentTarget.value.trim())}
        />
        <button
          onClick={() => setStarted(true)}
          disabled={!playerName}
          className={`bg-green-400 p-3 font-medium text-white w-1/2 ${
            !playerName ? "disabled-button" : ""
          }`}
        >
          Start
        </button>
      </div>
    </form>
  );
};

export default Start;
