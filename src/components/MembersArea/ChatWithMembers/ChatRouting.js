import React from "react";

import Chat from "./Chat/Chat";
import Join from "./Join";

import { BrowserRouter as Router, Route } from "react-router-dom";

const ChatRouting = () => {
  return (
    <div>
      <Router>
        <Route path="/member/join" exact component={Join} />
        <Route path="/member/chat" component={Chat} />
      </Router>
    </div>
  );
};

export default ChatRouting;
