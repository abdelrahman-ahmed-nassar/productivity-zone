import React from "react";
import "./NotFound.scss";
import soon from "../assets/imgs/ui-pattern.png";
const NotFound = () => {
  return (
    <div className="not-found">
      <img src={soon} alt="404 page"></img>
      <h2>Coming soon</h2>
    </div>
  );
};

export default NotFound;
