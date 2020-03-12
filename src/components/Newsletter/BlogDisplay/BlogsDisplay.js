import React from "react";
import "./BlogDisplay.scss";
import { Link, withRouter } from "react-router-dom";

const BlogDisplay = props => {
  console.log(props);
  const truncateBody = () => {
    if (props.blog.body.length <= 30) {
      return props.blog.body;
    }
    return props.blog.body.slice(0, 30) + "...";
  };
  return (
    <div
      className="blogs-display-card"
      onClick={() => {
        props.history.push(`/blog/${props.blog.blog_id}`);
      }}
    >
      <img src={props.blog.blog_img} className="blogs-display-img" />
      <section className="blogs-display-text-section">
        <h4>{props.blog.title}</h4>
        <p>{truncateBody()}</p>
        <span>
          <Link to={`/blog/${props.blog.blog_id}`}>View >></Link>
        </span>
      </section>
    </div>
  );
};

export default withRouter(BlogDisplay);
