import React from "react";

import "./InfoBar.scss";

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src="" alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">
        <img src="" alt="close icon" />
      </a>
    </div>
  </div>
);

export default InfoBar;
