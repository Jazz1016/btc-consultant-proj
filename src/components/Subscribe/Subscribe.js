import React, { useState } from "react";
import axios from "axios";

const Subscribe = props => {
  const [emailInput, setEmailInput] = useState("");
  return (
    <div>
      {props.text ? (
        <section>
          <p>{props.text}</p>
          <br />
          <input
            onChange={e => {
              setEmailInput(e.target.value);
            }}
            value={emailInput}
          />
          <button
            onClick={() => {
              axios.post(`/api/mail`, { emailInput });
            }}
          >
            Subscribe
          </button>
        </section>
      ) : (
        <section>
          <p>Seize your financial destiny!</p>
          <br />
          <input
            onChange={e => {
              console.log(e.target.value);
              setEmailInput(e.target.value);
            }}
            value={emailInput}
            placeholder="subscribe here!"
          />
          <button
            onClick={() => {
              console.log(emailInput);
              axios.post(`/api/mail`, { emailInput });
            }}
          >
            Subscribe
          </button>
        </section>
      )}
    </div>
  );
};

export default Subscribe;
