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
    console.log(el);
    return (
      <div key={i} className="spread-grow">
        <Card style={{ width: "18rem" }} className="product-card">
          <Card.Img variant="top" src={el.blog_img} />
          <Card.Body>
            <Card.Title>{el.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{el.body}</Card.Subtitle>
            <Card.Link to={`/blog/${el.blog_id}`}>View</Card.Link>
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
      <header></header>
      {blogDisplay}
    </div>
  );
};

export default Newsletter;
