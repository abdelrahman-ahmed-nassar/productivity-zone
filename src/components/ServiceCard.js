import React from "react";

// react icons
import { VscDebugStart } from "react-icons/vsc";
// react router

import "./ServiceCard.scss";

import { Link } from "react-router-dom";

const ServiceCard = ({
  icon,
  title,
  link,
  color,
  image,
  imageAlt,
  theClass,
}) => {
  return (
    <>
      <div className={"service-card"}>
        <div className={`${theClass} ${"service-card--up"}`}>
          <h2>{title}</h2>
        </div>
        <div className={"service-card--down"}>
          <Link to={link} className={"cta"} style={{ backgroundColor: color }}>
            <div className={"cta--link"}>
              <div className="pomodoro-cta-link">Start</div>
            </div>
            <div className={"cta--icon"}>
              <VscDebugStart color="#fff" />
            </div>
          </Link>
        </div>
        <div className={"service-card--img"}>
          {icon ? icon : <img src={image} alt={imageAlt} />}
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
