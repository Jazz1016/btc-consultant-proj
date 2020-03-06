import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Newsletter = props => {
  const [blogs, setBlogs] = useState([]);
  // console.log(blogs);
  useEffect(() => {
    axios.get(`/api/blog`).then(res => {
      setBlogs(res.data);
    });
  }, []);
  let blogDisplay = blogs.map((el, i) => {
    return (
      <div key={i}>
        <p>{el.title}</p>
        <Link to={`/blog/${el.blog_id}`}>
          <img src={el.blog_img} alt="thing to make error in console go" />
        </Link>
      </div>
    );
  });
  return <div>{blogDisplay}</div>;
};

export default Newsletter;
