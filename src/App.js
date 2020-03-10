import React from "react";
import "./App.css";
import Routes from "./Routes";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import { Route } from "react-router-dom";
import Charts from "./components/MembersArea/Charts/Charts";
import ChatWithMembers from "./components/MembersArea/ChatWithMembers/ChatWithMembers";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="temp-text-color">{Routes}</div>
      {/* <Route exact path="/member/charts" component={Charts} />
      <Route exact path="/member/chat" component={ChatWithMembers} /> */}
      <Footer />
    </div>
  );
}

export default App;
