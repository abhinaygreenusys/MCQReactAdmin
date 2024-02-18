import React from "react";
import "./button.scss";

const Button = ({
  className = "",
  id = "",
  disabled = false,
  onClick = () => {},
  theme = "theme",
  size = "md",
  rounded = "md",
  type = "button",
  children,
}) => {
  return (
    <button
      className={`btn btn-${theme} btn-${size} btn-rounded-${rounded} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      id={id}
    >
      {children}
    </button>
  );
};

export default Button;
