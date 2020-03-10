import React, { useState } from "react";
import "./MembersArea.css";
import { Switch, Route, Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Charts from "./Charts/Charts";
import ChatWithMembers from "./ChatWithMembers/ChatWithMembers";
import MemberRoutes from "./MemberRoutes";
import { HashRouter } from "react-router-dom";
import axios from "axios";

const MembersArea = props => {
  return (
    <div>
      <header></header>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/member/charts">Charts</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link>
            <Link to="/member/chat">Discussion</Link>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Data</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <Route exact path="/member/charts" component={Charts} />
      <Route exact path="/member/chat" component={ChatWithMembers} />
    </div>
  );
};

export default MembersArea;
