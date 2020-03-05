import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login, register } from "../../redux/reducers/userReducer";
import "./auth.css";

const Auth = props => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [logReg, setLogReg] = useState(false);
  useEffect(() => {}, []);
  return (
    <div className="auth-big-daddy">
      {logReg ? (
        <section className="auth-box">
          <h5>Email</h5>
          <input
            onChange={e => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
          />
          <h5>Password</h5>
          <input
            onChange={e => {
              setPass(e.target.value);
            }}
            value={pass}
          />
          <h5>First name</h5>
          <input
            onChange={e => {
              setFirst(e.target.value);
            }}
            value={first}
          />
          <h5>Last name</h5>
          <input
            onChange={e => {
              setLast(e.target.value);
            }}
            value={last}
          />
          <br />
          <button
            onClick={() => {
              props.register(email, pass, first, last);
            }}
          >
            Register
          </button>
          <br />
          <span
            onClick={() => {
              setLogReg(!logReg);
              setEmail("");
              setPass("");
              setFirst("");
              setLast("");
            }}
          >
            Already have an account? click here
          </span>
          <br />
        </section>
      ) : (
        <section className="auth-box">
          <h5>Email</h5>
          <input
            onChange={e => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
          />
          <h5>Password</h5>
          <input
            onChange={e => {
              setPass(e.target.value);
            }}
            value={pass}
            type="password"
          />
          <br />
          <button
            onClick={() => {
              props.login(email, pass);
            }}
          >
            Login
          </button>
          <span
            onClick={() => {
              setLogReg(!logReg);
              setEmail("");
              setPass("");
              setFirst("");
              setLast("");
            }}
          >
            Not Signed up? click here
          </span>
          <br />
        </section>
      )}
    </div>
  );
};

export default connect(null, { login, register })(Auth);
