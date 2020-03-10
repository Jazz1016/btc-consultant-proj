import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "./Subscribe.css";

const Subscribe = props => {
  const [emailInput, setEmailInput] = useState("");
  return (
    <div>
      {props.text ? (
        <section>
          <p>{props.text}</p>
          <input
            onChange={e => {
              setEmailInput(e.target.value);
            }}
            value={emailInput}
          />
          <Button
            variant=""
            onClick={() => {
              axios.post(`/api/mail`, { emailInput });
            }}
          >
            Subscribe
          </Button>
          <br />
        </section>
      ) : (
        <section>
          <p>Seize your financial destiny!</p>
          <input
            onChange={e => {
              console.log(e.target.value);
              setEmailInput(e.target.value);
            }}
            value={emailInput}
            placeholder="subscribe here!"
          />
          <Button
            onClick={() => {
              console.log(emailInput);
              axios.post(`/api/mail`, { emailInput });
            }}
          >
            Subscribe
          </Button>
          <br />
        </section>
      )}
    </div>
  );
};

export default Subscribe;
