import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./Blog.scss";

const Blog = props => {
  const [blog, setBlog] = useState({});
  console.log(blog);
  useEffect(() => {
    axios.get(`/api/blog/${props.match.params.id}`).then(res => {
      setBlog(res.data[0]);
    });
  }, [props.match.params.id]);
  return (
    <div>
      <h4>{blog.title}</h4>
      <img src={blog.blog_img} alt="non redundant alt " />
      <p>{blog.body}</p>
    </div>
  );
};

export default withRouter(Blog);
