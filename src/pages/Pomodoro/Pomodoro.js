import React, { useState, useEffect, useRef } from "react";
import "./Pomodoro.scss";
import { BsFillCheckCircleFill } from "react-icons/bs";
import alarmSound from "../../assets/media/alarm.mp3";
import clickSound from "../../assets/media/click.mp3";
import useLocalStorage from "../../hooks/use-local-storage-hook";
function getTime(d) {
  d = Number(d);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var mDisplay = m > 0 ? m : "00";
  var sDisplay = s > 0 ? s : "00";
  return mDisplay + ":" + sDisplay;
}

const Pomodoro = () => {
  const [pomodoroTime, setPomodoroTime] = useLocalStorage("pomodoro", 1500);
  const [breakTime, setBreakTime] = useLocalStorage("break", 300);
  const [isBlue, setIsBlue] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(pomodoroTime);
  const alarmRef = useRef();
  const clickRef = useRef();

  const handleBreakButton = () => {
    setIsBlue(true);
    setIsRunning(false);
    setTimer(breakTime);
  };

  const handlePomodoroButton = () => {
    setIsBlue(false);
    setIsRunning(false);
    setTimer(pomodoroTime);
  };

  const handleStartButton = () => {
    clickRef.current.play();
    setIsRunning((state) => {
      return !state;
    });
  };

  const blueDropMenuHandler = (e) => {
    setIsRunning(false);
    setBreakTime(e.target.value);
    setTimer(e.target.value);
  };

  const redDropMenuHandler = (e) => {
    setIsRunning(false);
    setPomodoroTime(e.target.value);
    setTimer(e.target.value);
  };

  useEffect(() => {
    if (!isRunning) return;
    if (timer === 0) {
      setIsBlue((state) => !state);
      setIsRunning((state) => !state);
      setTimer(isBlue ? pomodoroTime : breakTime);
      alarmRef.current.play();
    }

    const definer = setInterval(() => {
      setTimer((state) => state - 1);
    }, 1000);

    return () => clearInterval(definer);
  }, [isRunning, timer]);

  return (
    <div className={`pomodoro ${isBlue && "blue"}`}>
      <audio ref={alarmRef} style={{ display: "none", visibility: "hidden" }}>
        <source src={alarmSound} type="audio/mpeg"></source>
      </audio>
      <audio ref={clickRef} style={{ display: "none", visibility: "hidden" }}>
        <source src={clickSound} type="audio/mpeg"></source>
      </audio>
      <div className="pomodoro__header">
        <div>
          <BsFillCheckCircleFill fontSize={18} color="white" />

          <h1>Pomodoro timer</h1>
        </div>
        <div className="select-dropdown">
          {!isBlue && (
            <select
              onChange={redDropMenuHandler}
              defaultValue={pomodoroTime ? pomodoroTime : 1500}
            >
              <option value={10}>1</option>
              <option value={1500}>25</option>
              <option value={2100}>35</option>
              <option value={3000}>50</option>
            </select>
          )}

          {isBlue && (
            <select
              onChange={blueDropMenuHandler}
              defaultValue={breakTime ? breakTime : 300}
            >
              <option value={5}>1</option>
              <option value={300}>5</option>
              <option value={600}>10</option>
              <option value={900}>15</option>
            </select>
          )}
        </div>
      </div>
      <div className="pomodoro__container">
        <div className="pomodoro__container--header">
          <button
            className={`${isBlue || "active"}`}
            onClick={handlePomodoroButton}
          >
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
