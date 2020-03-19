import React, { useEffect, useState } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import "./ContactMsg.scss";
import { Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const ContactMsg = props => {
  const [msg, setMsg] = useState({});
  useEffect(() => {
    axios.get(`/api/contact/${props.match.params.id}`).then(res => {
      setMsg(res.data[0]);
    });
  }, [props.match.params.id]);
  // console.log(msg);
  return (
    <div className="contact-msg-route">
      <section className="message-card">
        <div className="message-card-name">
          <h4>{msg.email}</h4>
          <h6>{msg.name}</h6>
        </div>
        <h3>{msg.subject}</h3>
        <p>{msg.message}</p>
      </section>
      <Link to="/admin">
        <Button
          variant="primary"
          onClick={() => {
            axios.delete(`/api/contact/${msg.contact_msg_id}`);
          }}
        >
          delete message
        </Button>
      </Link>
    </div>
  );
};

const mapStateToProps = reduxState => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps)(withRouter(ContactMsg));
