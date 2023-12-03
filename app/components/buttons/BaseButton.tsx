import React from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  active?: boolean;
  defaultActive?: boolean;
  className?: string;
  disabled?: boolean;
};
const BaseButton = (props: ButtonProps) => {
  const {label, onClick, active, defaultActive, className, disabled} = props;
  return (
    <button
      onClick={onClick}
      className={`${className} ${active || defaultActive ? "active" : "btn"}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default BaseButton;
