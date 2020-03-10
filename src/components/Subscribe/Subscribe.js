import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "./Subscribe.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Subscribe = props => {
  const [emailInput, setEmailInput] = useState("");
  return (
    <div className="subscribe-outer-div">
      {props.text ? (
        <section>
          <p>{props.text}</p>
          <form
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <input
              onChange={e => {
                setEmailInput(e.target.value);
              }}
              value={emailInput}
              placeholder="subscribe here!"
              type="email"
            />
            <Button
              type="submit"
              onClick={() => {
                if (emailInput.includes("@")) {
                  console.log("hit");
                  axios.post(`/api/mail`, { emailInput });
                } else {
                  toast.error("please use a valid email address", {
                    position: toast.POSITION.BOTTOM_RIGHT
                  });
                }
              }}
            >
              Subscribe
            </Button>
          </form>
          <br />
        </section>
      ) : (
        <section>
          <p>Seize your financial destiny!</p>
          <form
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <input
              onChange={e => {
                setEmailInput(e.target.value);
              }}
              value={emailInput}
              placeholder="subscribe here!"
              type="email"
            />
            <Button
              type="submit"
              onClick={() => {
                if (emailInput.includes("@")) {
                  console.log("hit");
                  axios.post(`/api/mail`, { emailInput });
                } else {
                  toast.error("please use a valid email address", {
                    position: toast.POSITION.BOTTOM_RIGHT
                  });
                }
              }}
            >
              Subscribe
            </Button>
          </form>
        </section>
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Subscribe;
