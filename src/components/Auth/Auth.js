import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login, register } from "../../redux/reducers/userReducer";
// import { Link } from "react-router-dom";

const Auth = props => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [logReg, setLogReg] = useState(false);
  useEffect(() => {}, []);
  return (
    <div>
      {logReg ? (
        <section>
          <p>Email</p>
          <input
            onChange={e => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
          />
          <p>Password</p>
          <input
            onChange={e => {
              setPass(e.target.value);
            }}
            value={pass}
          />
          <p>First name</p>
          <input
            onChange={e => {
              setFirst(e.target.value);
            }}
            value={first}
          />
          <p>Last name</p>
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
        </section>
      ) : (
        <section>
          <h4>Email</h4>
          <input
            onChange={e => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
          />
          <h4>Password</h4>
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
        </section>
      )}
    </div>
  );
};

export default connect(null, { login, register })(Auth);
