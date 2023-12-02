import React from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  active?: boolean;
  defaultActive?: boolean;
  className?: string;
};
const BaseButton = (props: ButtonProps) => {
  const {label, onClick, active, defaultActive, className} = props;
  return (
    <button
      onClick={onClick}
      className={`${className} ${active || defaultActive ? "active" : "btn"} `}
    >
      {label}
    </button>
  );
};

export default BaseButton;
