import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Newsletter.css";
import Card from "react-bootstrap/Card";

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
    return (
      <div key={i} className="spread-grow">
        <Card style={{ width: "18rem" }} className="product-card">
          <Card.Img variant="top" src={el.blog_img} />
          <Card.Body>
            <Card.Title>{el.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {truncateString(el.body, 30)}
            </Card.Subtitle>
            <Link to={`/blog/${el.blog_id}`}>View</Link>
          </Card.Body>
        </Card>
        {/* <p>{}</p>
        <Link to={`/blog/${el.blog_id}`}>
          <img src= alt="thing to make error in console go" />
        </Link> */}
      </div>
    );
  });
  return (
    <div className="center-newsletter">
      <header className="newsletter-header">header</header>
      <section className="blog-box">{blogDisplay}</section>
    </div>
  );
};

export default Newsletter;
