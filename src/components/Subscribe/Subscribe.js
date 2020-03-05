import React, { useState } from "react";

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
        </section>
      ) : (
        <section>
          <p>Seize your financial destiny!</p>
          <br />
          <input
            onChange={e => {
              setEmailInput(e.target.value);
            }}
            value={emailInput}
            placeholder="subscribe here!"
          />
          <button></button>
        </section>
      )}
    </div>
  );
};

export default Subscribe;
