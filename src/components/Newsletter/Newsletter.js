import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Newsletter.scss";
import Card from "react-bootstrap/Card";
import BlogsDisplay from "./BlogDisplay/BlogsDisplay";
import Subscribe from "../Subscribe/Subscribe";

const Newsletter = props => {
  const [blogs, setBlogs] = useState([]);
  // console.log(blogs);
  useEffect(() => {
    axios.get(`/api/blog`).then(res => {
      setBlogs(res.data);
    });
  }, []);
  let blogDisplay = blogs.map((el, i) => {
    // console.log(el);
    const truncateString = (str, num) => {
      if (str.length <= num) {
        return str;
      }
      return str.slice(0, num) + "...";
    };
    return <BlogsDisplay key={el.blog_id} blog={el} />;
  });
  return (
    <div className="center-newsletter">
      <header className="newsletter-header">header</header>
      <div className="newsletter-desktop">
        <section className="blog-box">{blogDisplay}</section>
        <section className="newsletter-sidebar hide-sidebar">
          <h5>Sign up now to access the members area</h5>
          <Link to="/auth">Sign up here</Link>
          <img
            className="sidebar-crypto-img"
            src="http://cdn.images.express.co.uk/img/dynamic/151/590x/secondary/Comet-Now-348670.jpg"
            alt="crypto image"
          />
          <h6>Don't miss out on all the fun</h6>
        </section>
      </div>
      <Subscribe />
    </div>
  );
};

export default Newsletter;
