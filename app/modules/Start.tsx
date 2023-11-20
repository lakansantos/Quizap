import React from "react";

const Start = ({setStarted}: {setStarted: (state: boolean) => void}) => {
  return (
    <div className="flex">
      <label htmlFor="nameInput">What&apos; your name?</label>
      <input type="text" id="nameInput" className="border border-black" />
      <button onClick={() => setStarted(true)}>Start</button>
    </div>
  );
};

export default Start;
