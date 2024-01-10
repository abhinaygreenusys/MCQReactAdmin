import React from "react";
import "./card.scss";

const Card = ({ children, className = "", size = "md" }) => {
  return <div className={`card ${className} card-${size}`}>{children}</div>;
};

export default Card;
