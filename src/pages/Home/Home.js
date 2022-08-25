import React from "react";

import ServiceCard from "../../components/ServiceCard";
import { FcCheckmark, FcSafe, FcCalculator } from "react-icons/fc";
import pomodoro from "../../assets/imgs/pomodoro.png";
import goalsImg from "../../assets/imgs/goals.png";
import notesImg from "../../assets/imgs/notes.png";
import countDown from "../../assets/imgs/count-down.png";
import sandImg from "../../assets/imgs/sand.png";

// assets
import leftImg from "../../assets/imgs/welcome-left.png";
import logo from "../../assets/imgs/logo.png";
import rightImg from "../../assets/imgs/welcome-right.png";
import centerImg from "../../assets/imgs/welcome-center.png";

// styles
import classes from "./Home.module.scss";

// hooks
import useWindowSize from "../../hooks/use-window-size";
const Home = () => {
  const { width, height } = useWindowSize();

  return (
    <>
      <section className={classes["hero"]}>
        {width > 1000 && (
          <div className={classes["left"]}>
            <img src={leftImg} className={classes["img--left"]} alt="man"></img>
          </div>
        )}
        <div className={classes["center"]}>
          <img src={logo} className={classes["logo"]} alt="logo"></img>
          {width < 1000 && (
            <img
              src={centerImg}
              className={classes["img--center"]}
              alt="boy and girl"
            ></img>
          )}
          <p className={classes["slogan"]}>
            Focus on being productive Not busy
          </p>
          <p>use our Time management tools to increase your productivity </p>
          <a className={classes["hero-cta"]} href="#services">
            start now
          </a>
        </div>
        {width > 1000 && (
          <div className={classes["right"]}>
            <img
              src={rightImg}
              className={classes["img--right"]}
              alt="girl"
            ></img>
          </div>
        )}
      </section>
      {/* services Section */}
      <section className={classes["services"]} id="services">
        <div className={classes["services__container"]}>
          <ServiceCard
            title="pomodoro timer"
            image={pomodoro}
            link="/pomodoro"
            color={"#e63632"}
            theClass="service-card--up--red"
          />
          <ServiceCard
            title="To do List"
            link={"/todo"}
            icon={<FcCheckmark fontSize={55} />}
            color={"#43a047"}
            theClass="service-card--up--green"
          />
          <ServiceCard
            title="set goals"
            link={"/goals"}
            image={goalsImg}
            color={"#e64980"}
            theClass="service-card--up--pink"
          />
          <ServiceCard
            title="Take notes"
            link={"/notes"}
            image={notesImg}
            color={"#f59f00"}
            theClass="service-card--up--yellow"
          />
          <ServiceCard
            title="Count down"
            link={"/count-down"}
            image={countDown}
            color={"#0064e6"}
            theClass="service-card--up--blue"
          />
          <ServiceCard
            title="passwords manager"
            link={"/passwords"}
            icon={<FcSafe fontSize={55} />}
            color={"#868e96"}
            theClass="service-card--up--gray"
          />
          <ServiceCard
            title="calculator"
            link={"/calculator"}
            icon={<FcCalculator fontSize={55} />}
            color={"#12b886"}
            theClass="service-card--up--teal"
          />
          <ServiceCard
            title="Timer"
            link={"/calculator"}
            image={sandImg}
            color={"#fd7e14"}
            theClass="service-card--up--orange"
          />
        </div>
      </section>
    </>
  );
};

export default Home;
