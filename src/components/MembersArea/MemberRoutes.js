import React from "react";
import { Switch, Route } from "react-router-dom";
import Charts from "./Charts/Charts";
import ChatWithMembers from "./ChatWithMembers/ChatWithMembers";

export default (
  <Switch>
    <Route path="/member/charts" component={Charts} />
    <Route path="/member/chat" component={ChatWithMembers} />
  </Switch>
);
