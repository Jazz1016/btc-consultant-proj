import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { v4 as randomString } from "uuid";
import "./Blog.css";

const BlogEdit = props => {
  const [blogObj, setBlogObj] = useState({
    blog_img: "",
    title: "",
    body: ""
  });
  const [blog_img, setImg] = useState("");
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
        <InputGroup size="sm" className="mb-3">
          <img src={blogObj.blog_img} />
          <br />
          <input type="file" onChange={e => getSignedRequest(e.target.files)} />
        </InputGroup>
        <br />
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default">
              Title
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={title}
            onChange={e => {
              setInputs(e);
            }}
            name="title"
          />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-lg">Body</InputGroup.Text>
          </InputGroup.Prepend>
          <textarea
            cols="50"
            rows="10"
            placeholder="hiiiii"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            value={body}
            onChange={e => {
              setInputs(e);
            }}
            name="body"
          />
        </InputGroup>
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
          }}
        >
          Confirm Edit
        </Button>
      </section>
      <br />
    </div>
  );
};

export default withRouter(BlogEdit);
