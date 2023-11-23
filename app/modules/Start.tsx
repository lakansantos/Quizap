import Image from "next/image";
import {useRouter} from "next/navigation";
import React, {SyntheticEvent} from "react";
const Start = ({
  setPlayerName,
  playerName,
}: {
  setPlayerName: (state: string) => void;
  playerName: string;
}) => {
  const router = useRouter();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    router.push("/choices");
  };

  return (
    <form
      className="flex w-full h-full justify-center items-center"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center items-center flex-col w-3/4 h-1/2 gap-7">
        <p className="text-4xl sm:text-6xl font-marhey font-semibold text-white text-center">
          Howdy, what&apos;s your name?
        </p>
        <Image
          src="/welcome-guy.png"
          alt="guy"
          width={200}
          height={200}
          style={{height: "auto", width: "auto"}} //for console warning
          priority
        />
        <input
          type="text"
          id="nameInput"
          placeholder="Enter your name"
          className="border border-black w-full py-2 indent-3 lg:w-1/2 "
          onChange={(e) => setPlayerName(e.currentTarget.value.trim())}
        />
        <button
          type="submit"
          disabled={!playerName}
          className={`bg-green-400 p-3 font-medium text-white w-full lg:w-1/2 ${
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
