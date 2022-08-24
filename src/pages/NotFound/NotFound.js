import React from "react";
import "./NotFound.scss";
import soon from "../../assets/imgs/ui-pattern.png";
const NotFound = () => {
  return (
    <div
      className="not-found"
      style={{
        backgroundImage: `url(${soon})`,
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
      }}
    >
      <h2>Coming soon</h2>
    </div>
  );
};

export default NotFound;
