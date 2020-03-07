import React from "react";
import "./App.css";
import Routes from "./Routes";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <div>{Routes}</div>
      <Footer />
    </div>
  );
}

export default App;
