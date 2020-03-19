import React, { useState } from "react";
import "./MembersArea.scss";
import { Switch, Route, Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Charts from "./Charts/Charts";
import ChatWithMembers from "./ChatWithMembers/ChatWithMembers";
import MemberRoutes from "./MemberRoutes";
import { HashRouter } from "react-router-dom";
import axios from "axios";

const MembersArea = props => {
  return (
    <div className="members-route">
      <header className="members-header">
        <Link to="/member/charts">Charts</Link>
        <div></div>
        <Link to="/member/chat">Discussion</Link>
      </header>
      <Switch>
        <Route exact path="/member/charts" component={Charts} />
        <Route exact path="/member/chat" component={ChatWithMembers} />
      </Switch>
    </div>
  );
};

export default MembersArea;
