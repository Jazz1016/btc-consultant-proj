import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { v4 as randomString } from "uuid";
import "./BlogEdit.scss";

const BlogEdit = props => {
  const [blogObj, setBlogObj] = useState({
    blog_img: "",
    title: "",
    body: ""
  });
  useEffect(() => {
    axios.get(`/api/blog/${props.match.params.id}`).then(res => {
      setBlogObj(res.data[0]);
      // setImg(res.data[0].blog_img);
    });
  }, [props.match.params.id]);
  console.log(blogObj);
  const setInputs = e => {
    setBlogObj({ ...blogObj, [e.target.name]: e.target.value });
  };
  //=======================================================================
  let getSignedRequest = ([file]) => {
    // this.setState({ isUploading: true });
    const fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;
    axios
      .get("/sign-s3", {
        params: {
          "file-name": fileName,
          "file-type": file.type
        }
      })
      .then(response => {
        const { signedRequest, url } = response.data;
        uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };

    axios
      .put(signedRequest, file, options)
      .then(response => {
        setBlogObj({ ...blogObj, blog_img: url });
        // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
      })
      .catch(err => {
        console.log(err);
      });
  };
  // ==================================================
  const { title, body } = blogObj;

  return (
    <div>
      <section className="blog-edit-center">
        <img src={blogObj.blog_img} alt="blog title photo" />
        <br />
        <input type="file" onChange={e => getSignedRequest(e.target.files)} />
        <br />
        <div>
          <h4 id="inputGroup-sizing-default">Title</h4>

          <textarea
            value={title}
            onChange={e => {
              setInputs(e);
            }}
            name="title"
          />
        </div>

        <br />
        <div>
          <h4>Body</h4>

          <textarea
            cols="70"
            rows="10"
            value={body}
            onChange={e => {
              setInputs(e);
            }}
            name="body"
          />
        </div>
        <div>
          <Button
            onClick={() => {
              axios.put(`/api/blog/${props.match.params.id}`, {
                blog_img: blogObj.blog_img,
                title,
                body
              });
              axios.get(`/api/blog/${props.match.params.id}`).then(res => {
                setBlogObj(res.data[0]);
              });
              props.history.push("/admin");
            }}
          >
            Confirm Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              let bool = window.confirm(
                `Are you sure you want to delete this blog post?`
              );
              if (bool) {
                axios.delete(`/api/blog/${props.match.params.id}`);
                props.history.push("/admin");
              }
            }}
          >
            Delete Post
          </Button>
        </div>
      </section>
      <br />
    </div>
  );
};

export default withRouter(BlogEdit);
