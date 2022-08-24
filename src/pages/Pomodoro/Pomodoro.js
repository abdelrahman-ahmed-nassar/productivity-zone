import React, { useState, useEffect, useRef } from "react";
import "./Pomodoro.scss";
import { BsFillCheckCircleFill } from "react-icons/bs";
import alarm from "../../assets/media/alarm.mp3";
const Pomodoro = () => {
  const pomodoroTime = 60;
  const BreakTime = 30;
  const [isBlue, setIsBlue] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(pomodoroTime);
  const alarmRef = useRef();

  function getTime(d) {
    d = Number(d);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var mDisplay = m > 0 ? m : "00";
    var sDisplay = s > 0 ? s : "00";
    return mDisplay + ":" + sDisplay;
  }

  const handleBreakButton = () => {
    setIsBlue(true);
    setIsRunning(false);
    setTimer(BreakTime);
  };
  const handlePomodoroButton = () => {
    setIsBlue(false);
    setIsRunning(false);
    setTimer(pomodoroTime);
  };

  const handleStartButton = () => {
    setIsRunning((state) => {
      return !state;
    });
  };

  useEffect(() => {
    if (!isRunning) return;
    if (timer === 0) {
      setIsBlue((state) => !state);
      setIsRunning((state) => !state);
      setTimer(isBlue ? pomodoroTime : BreakTime);
      alarmRef.current.play();
    }

    const definer = setInterval(() => {
      setTimer((state) => state - 1);
    }, 1000);

    return () => clearInterval(definer);
  }, [isRunning, timer]);

  return (
    <div className={`pomodoro ${isBlue && "blue"}`}>
      <audio
        ref={alarmRef}
        controls
        style={{ display: "none", visibility: "hidden" }}
      >
        <source src={alarm} type="audio/mpeg"></source>
      </audio>
      <div className="pomodoro__header">
        <BsFillCheckCircleFill fontSize={18} color="white" />

        <h1>Pomodoro timer</h1>
      </div>
      <div className="pomodoro__container">
        <div className="pomodoro__container--header">
          <button
            className={`${isBlue || "active"}`}
            onClick={handlePomodoroButton}
          >
            {" "}
            Pomodoro
          </button>
          <button
            className={`${isBlue && "active"}`}
            onClick={handleBreakButton}
          >
            Break
          </button>
        </div>
        <div className="pomodoro__container--body">
          <div className="timer">{getTime(timer)}</div>
          <div className="controller">
            <button
              className={`${isBlue && "blue"} ${isRunning ? "stop" : "start"}`}
              onClick={handleStartButton}
            >
              {isRunning ? "stop" : "start"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
