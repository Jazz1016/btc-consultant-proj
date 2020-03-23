import React, { useState } from "react";
import "./MembersAreaHome.scss";
import { Switch, Route, Link } from "react-router-dom";
import Charts from "../Charts/Charts";
import Join from "../ChatWithMembers/Join";
import Chat from "../ChatWithMembers/Chat/Chat";

const MembersArea = props => {
  return (
    <div className="members-route">
      <header className="members-header">
        <Link to="/member">Discussion</Link>
        <div></div>
        <Link to="/member/charts">Charts</Link>
      </header>
      <Switch>
        <Route exact path="/member" component={Join} />
        <Route exact path="/member/chat" component={Chat} />
        <Route exact path="/member/charts" component={Charts} />
      </Switch>
    </div>
  );
};

export default MembersArea;
