import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactS3 from "react-s3";
// import S3FileUpload from "react-s3";
import { v4 as randomString } from "uuid";
// import Button from "react-bootstrap";

const Admin = props => {
  const [messageArr, setMessageArr] = useState([]);
  const [blogArr, setBlogArr] = useState([]);
  const [url, setUrl] = useState("");
  const [blogObj, setBlogObj] = useState({
    title: "",
    body: ""
  });
  const inputs = e => {
    setBlogObj({ ...blogObj, [e.target.name]: e.target.value });
  };
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
  }, [props.history, props.user.isadmin]);
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
        setUrl(url);
        // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
      })
      .catch(err => {
        console.log(err);
      });
  };

  console.log(blogObj.title);
  const { title, body } = blogObj;
  return (
    <div>
      <section>
        <h3>Messages:</h3>
        {messageDisplay}
      </section>
      <section>
        <h3>New blog post:</h3>
        <img src={`${url}`} />
        <input type="file" onChange={e => getSignedRequest(e.target.files)} />
        <input value={title} name="title" onChange={e => inputs(e)} />
        <input value={body} name="body" onChange={e => inputs(e)} />
        <button
          onClick={() => {
            axios
              .post(`/api/blog`, {
                blog_img: url,
                title: title,
                body: blogObj.body
              })
              .then(res => {
                console.log(res);
              });
          }}
        >
          upload blog post
        </button>
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
