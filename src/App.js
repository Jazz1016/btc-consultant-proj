import React from "react";
import "./App.css";
import Routes from "./Routes";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div>{Routes}</div>
    </div>
  );
}

export default App;
