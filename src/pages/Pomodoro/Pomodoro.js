import React, { useState, useEffect, useRef, useReducer } from "react";
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
  const [isTakingShortBreak, setIsTakingShortBreak] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(pomodoroTime);
  const [sessions, setSessions] = useState(1);
  const [progress, setProgress] = useState(0);
  const alarmRef = useRef();
  const clickRef = useRef();

  // play -- stop
  const startButtonHandler = () => {
    clickRef.current.play();
    setIsRunning((state) => {
      return !state;
    });
  };

  // time settings

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

  // red -- blue

  const pomodoroTabHandler = () => {
    setIsTakingShortBreak(false);
    setIsRunning(false);
    setTimer(pomodoroTime);
  };

  const breakTabHandler = () => {
    setIsTakingShortBreak(true);
    setIsRunning(false);
    setTimer(breakTime);
  };

  // timer
  useEffect(() => {
    if (!isRunning) return;
    if (timer === 0) {
      if (isTakingShortBreak) setSessions((state) => state + 1);

      setIsTakingShortBreak((state) => !state);
      setIsRunning((state) => !state);
      setTimer(isTakingShortBreak ? pomodoroTime : breakTime);
      alarmRef.current.play();
    }

    const definer = setInterval(() => {
      setTimer((state) => state - 1);
    }, 1000);

    return () => clearInterval(definer);
  }, [isRunning, timer]);

  // progress bar
  useEffect(() => {
    const root = document.querySelector(":root");
    root.style.setProperty("--progress", `${progress}%`);
  }, [progress]);

  useEffect(() => {
    setProgress(100 - (timer / pomodoroTime) * 100);
  }, [timer, pomodoroTime]);

  return (
    <div className={`pomodoro ${isTakingShortBreak && "blue"}`}>
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
          {!isTakingShortBreak && (
            <select
              onChange={redDropMenuHandler}
              defaultValue={pomodoroTime ? pomodoroTime : 1500}
            >
              <option value={10}>try</option>
              <option value={1500}>25</option>
              <option value={2100}>35</option>
              <option value={3000}>50</option>
            </select>
          )}

          {isTakingShortBreak && (
            <select
              onChange={blueDropMenuHandler}
              defaultValue={breakTime ? breakTime : 300}
            >
              <option value={5}>try</option>
              <option value={300}>5</option>
              <option value={600}>10</option>
              <option value={900}>15</option>
            </select>
          )}
        </div>
      </div>
      <div className="progress-bar" data-progress={"50"}></div>
      <div className="pomodoro__container">
        <div className="pomodoro__container--header">
          <button
            className={`${isTakingShortBreak || "active"}`}
            onClick={pomodoroTabHandler}
          >
            Pomodoro
          </button>
          <button
            className={`${isTakingShortBreak && "active"}`}
            onClick={breakTabHandler}
          >
            Break
          </button>
        </div>
        <div className="pomodoro__container--body">
          <div className="timer">{getTime(timer)}</div>
          <div className="controller">
            <button
              className={`${isTakingShortBreak && "blue"} ${
                isRunning ? "stop" : "start"
              }`}
              onClick={startButtonHandler}
            >
              {isRunning ? "stop" : "start"}
            </button>
          </div>
        </div>
      </div>
      <p className="completed-sessions">#{sessions}</p>
      <p className="motivation-word">
        {isTakingShortBreak ? "Time for a break!" : "Time to focus!"}
      </p>
    </div>
  );
};

export default Pomodoro;
