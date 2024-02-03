"use client";

import React, {useState} from "react";
import BaseButton from "./BaseButton";

type ButtonProps = {
  buttonItems: {
    label: string;
    onClick?: () => void;
    defaultActive?: boolean;
    active?: boolean;
  }[];
  className?: string;
};

const Button = (props: ButtonProps) => {
  const {buttonItems, className} = props;
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(
    null
  );

  const [removeDefaultActive, setRemoveDefaultActive] = useState<boolean>(true);

  const handleActiveClick = (key: number, defaultActive?: boolean) => {
    if (!!defaultActive) {
      setActiveButtonIndex(null);
    }
    setRemoveDefaultActive(false);
    setActiveButtonIndex(key);
  };

  return (
    <React.Fragment>
      {buttonItems.map((item, key) => {
        const {label, onClick, defaultActive, active} = item;
        return (
          <BaseButton
            key={key}
            className={className}
            label={label}
            active={
              activeButtonIndex === key ||
              defaultActive === removeDefaultActive ||
              active
            }
            onClick={() => {
              handleActiveClick(key, defaultActive);
              if (onClick) onClick();
            }}
          />
        );
      })}
    </React.Fragment>
  );
};

export default Button;
