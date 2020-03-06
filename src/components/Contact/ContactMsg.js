import React, { useEffect, useState } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

const ContactMsg = props => {
  const [msg, setMsg] = useState({});
  useEffect(() => {
    axios.get(`/api/contact/${props.match.params.id}`).then(res => {
      setMsg(res.data[0]);
    });
  }, [props.match.params.id]);
  // console.log(msg);
  return (
    <div>
      <p>{msg.email}</p>
      <p>{msg.name}</p>
      <p>{msg.subject}</p>
      <p>{msg.message}</p>
      <>
        <Link to="/admin">
          <button
            onClick={() => {
              axios.delete(`/api/contact/${msg.contact_msg_id}`);
            }}
          >
            delete message
          </button>
        </Link>
      </>
    </div>
  );
};

const mapStateToProps = reduxState => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps)(withRouter(ContactMsg));
