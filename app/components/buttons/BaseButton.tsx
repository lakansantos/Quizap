import React from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  active?: boolean;
  defaultActive?: boolean;
};
const BaseButton = (props: ButtonProps) => {
  const {label, onClick, active, defaultActive} = props;
  return (
    <button
      onClick={onClick}
      className={active || defaultActive ? "active" : "btn"}
    >
      {label}
    </button>
  );
};

export default BaseButton;
