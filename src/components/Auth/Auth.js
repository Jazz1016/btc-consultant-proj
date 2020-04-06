import React, { useState } from "react";
import { connect } from "react-redux";
import { login, register } from "../../redux/reducers/userReducer";
import "./Auth.scss";
import Input from "@material-ui/core/Input";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const Auth = props => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [logReg, setLogReg] = useState(false);
  // console.log(props);
  return (
    <div className="auth-big-daddy">
      {logReg ? (
        <section className="auth-box">
          <h5>Email</h5>
          <Input
            onChange={e => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
          />
          <h5>Password</h5>
          <Input
            onChange={e => {
              setPass(e.target.value);
            }}
            value={pass}
          />
          <h5>First name</h5>
          <Input
            onChange={e => {
              setFirst(e.target.value);
            }}
            value={first}
          />
          <h5>Last name</h5>
          <Input
            onChange={e => {
              setLast(e.target.value);
            }}
            value={last}
          />
          <br />
          <Button
            onClick={() => {
              props.register(email, pass, first, last);
              props.history.push("/");
            }}
            color="red"
          >
            Register
          </Button>
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
          <Input
            onChange={e => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
          />
          <h5>Password</h5>
          <Input
            onChange={e => {
              setPass(e.target.value);
            }}
            value={pass}
            type="password"
          />
          <br />
          <Button
            onClick={() => {
              props.login(email, pass);
              props.history.push("/");
            }}
          >
            Login
          </Button>
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
            Not Signed up? click here
          </span>
          <br />
        </section>
      )}
    </div>
  );
};
const mapStateToProps = state => {
  return state.userReducer;
};

export default connect(mapStateToProps, { login, register })(withRouter(Auth));
