import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Admin = props => {
  const [messageArr, setMessageArr] = useState([]);
  const [blogArr, setBlogArr] = useState([]);
  console.log(props);
  useEffect(() => {
    if (props.user.isadmin) {
      axios.get(`/api/contact`).then(res => {
        setMessageArr(res.data);
      });
      axios.get(`/api/blog`).then(res => {
        setBlogArr(res.data);
      });
    } else {
      props.history.push("/");
    }
  }, []);
  console.log(messageArr, blogArr);
  let messageDisplay = messageArr.map(el => {
    return (
      <Link to={`/contact/${el.contact_msg_id}`}>
        <div>{el.subject}</div>
      </Link>
    );
  });
  let blogsDisplay = blogArr.map(el => {
    return (
      <Link to={`/blogEdit/${el.blog_id}`}>
        <div>{el.title}</div>
      </Link>
    );
  });
  return (
    <div>
      <section>
        <h3>Messages:</h3>
        {messageDisplay}
      </section>
      <section>
        <h3>New blog post:</h3>
        <input />
        <input />
        <input />
      </section>
      <section>
        <h3>Edit blog posts:</h3>
        {blogsDisplay}
      </section>
    </div>
  );
};

const mapStateToProps = reduxState => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps)(Admin);
