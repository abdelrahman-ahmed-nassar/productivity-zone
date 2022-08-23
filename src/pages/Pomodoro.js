import React from "react";
import "./Pomodoro.scss";
import { BsFillCheckCircleFill } from "react-icons/bs";
const Pomodoro = () => {
  return (
    <div className="pomodoro">
      <div className="pomodoro__header">
        <BsFillCheckCircleFill fontSize={18} color="white" />
        <h1>Pomodoro timer</h1>
      </div>
      <div className="pomodoro__container"></div>
    </div>
  );
};

export default Pomodoro;
