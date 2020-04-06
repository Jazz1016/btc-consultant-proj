import React, { useState, useEffect } from "react";
import "./MembersAreaHome.scss";
import {
  Route,
  Switch,
  Link,
  withRouter,
  BrowserRouter as Router
} from "react-router-dom";
import Charts from "../Charts/Charts";
import Join from "../ChatWithMembers/Join";
import Chat from "../ChatWithMembers/Chat/Chat";
import { connect } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout, clearReducer } from "../../../redux/reducers/userReducer";
import ChatRouting from "../ChatWithMembers/ChatRouting";

const MembersArea = props => {
  console.log(props);
  useEffect(() => {
    if (!props.user.user_id) {
      props.history.push("/");
      toast.error("Please log in or Register", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }, []);
  return (
    <div className="members-route">
      <header className="members-header">
        <section className="member-links">
          <Link to="/member">Discussion</Link>
          <div></div>
          <Link to="/member/charts">Charts</Link>
        </section>
        <h6
          onClick={() => {
            axios
              .post(`/api/logout`)
              .then(() => {
                props.logout();
                props.clearReducer();
                props.history.push("/");
              })
              .catch(err => {
                console.log(err);
              });
          }}
        >
          Logout
        </h6>
      </header>
      <Switch>
        <Route exact path="/member" component={Join} />
        <Route path="/member/chat" component={Chat} />
        <Route path="/member/charts" component={Charts} />
      </Switch>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

const mapStateToProps = reduxState => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps, { logout, clearReducer })(
  withRouter(MembersArea)
);
