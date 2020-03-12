import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactS3 from "react-s3";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { v4 as randomString } from "uuid";
import "./Admin.scss";

const Admin = props => {
  const [messageArr, setMessageArr] = useState([]);
  const [blogArr, setBlogArr] = useState([]);
  const [prodArr, setProdArr] = useState([]);
  const [url, setUrl] = useState("");
  const [blogObj, setBlogObj] = useState({
    title: "",
    body: ""
  });
  const [newProd, setNewProd] = useState({
    product_name: "",
    product_img: "",
    price: 0,
    description: "",
    available: false
  });
  const inputs = e => {
    setBlogObj({ ...blogObj, [e.target.name]: e.target.value });
  };
  const prodInputs = e => {
    setNewProd({ ...newProd, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    // if (props.user.isadmin) {
    axios.get(`/api/contact`).then(res => {
      setMessageArr(res.data);
    });
    axios.get(`/api/blog`).then(res => {
      setBlogArr(res.data);
    });
    axios.get(`/api/products`).then(res => {
      setProdArr(res.data);
    });
    // } else {
    //   props.history.push("/");
    // }
  }, [props.history, props.user.isadmin]);
  let messageDisplay = messageArr.map(el => {
    return (
      <ListGroup.Item
        action
        onClick={() => {
          props.history.push(`/contact/${el.contact_msg_id}`);
        }}
      >
        <div>{el.subject}</div>
      </ListGroup.Item>
    );
  });
  let blogsDisplay = blogArr.map(el => {
    return (
      <ListGroup.Item
        action
        onClick={() => {
          props.history.push(`/blogEdit/${el.blog_id}`);
        }}
      >
        <div>{el.title}</div>
      </ListGroup.Item>
    );
  });
  const productsDelete = prodArr.map(el => {
    return (
      <ListGroup.Item>
        <div>{el.product_name}</div>
        <Button
          variant="danger"
          onClick={() => {
            let bool = window.confirm(
              `Are you sure you want to delete this product`
            );
            if (bool) {
              axios.delete(`/api/products/${el.product_id}`);
            }
          }}
        >
          Delete
        </Button>
      </ListGroup.Item>
    );
  });
  // <------------------ Amazon S3 CODE -------------------------->
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
  // <--------------------------------------------------->
  let getSignedRequestProd = ([file]) => {
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
        uploadFileProd(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const uploadFileProd = (file, signedRequest, url) => {
    console.log("hit upload prod pic");
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };

    axios
      .put(signedRequest, file, options)
      .then(response => {
        setNewProd({ ...newProd, product_img: url });
        // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
      })
      .catch(err => {
        console.log(err);
      });
  };

  //<--------------------------------------------------------------->
  // console.log(newProd);
  const { title, body } = blogObj;
  const { product_name, product_img, price, description, available } = newProd;
  return (
    <div className="admin-holder">
      <section className="grid-holder">
        <h3>Messages:</h3>
        <ListGroup>{messageDisplay}</ListGroup>
      </section>
      <section>
        <h3>New Blog Post:</h3>
        <Form>
          <Form.Group controlId="formGroupBlogImage">
            <input
              type="file"
              onChange={e => getSignedRequest(e.target.files)}
            />
          </Form.Group>
          <Form.Group controlId="formGroupTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              name="title"
              onChange={e => inputs(e)}
            />
          </Form.Group>
          <Form.Group controlId="formGroupBody">
            <Form.Label>Body</Form.Label>
            <Form.Control value={body} name="body" onChange={e => inputs(e)} />
          </Form.Group>
        </Form>
        <Button
          variant="primary"
          onClick={() => {
            if (title !== "" && body !== "" && url !== "") {
              axios
                .post(`/api/blog`, {
                  blog_img: url,
                  title: title,
                  body: blogObj.body
                })
                .then(res => {
                  console.log(res);
                });
            } else {
              alert("Blog post needs an image, body and a title");
            }
            setBlogObj({ title: "", body: "" });
            setUrl("");
          }}
        >
          upload blog post
        </Button>
      </section>
      <section className="grid-holder">
        <h3>Edit Blog Post:</h3>
        <ListGroup>{blogsDisplay}</ListGroup>
      </section>
      <h3>New Product:</h3>
      <Form>
        <Form.Group controlId="formGroupProdImage">
          <Form.Control
            type="file"
            onChange={e => getSignedRequestProd(e.target.files)}
          />
        </Form.Group>
        <Form.Group controlId="formGroupProdName">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={product_name}
            name="product_name"
            onChange={e => prodInputs(e)}
          />
        </Form.Group>
        <Form.Group controlId="formGroupPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            name="price"
            onChange={e => prodInputs(e)}
          />
        </Form.Group>
        <Form.Group controlId="formGroupDesc">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            name="description"
            onChange={e => prodInputs(e)}
          />
        </Form.Group>
        <Form.Group controlId="formGroupAvailable">
          <Form.Label>Available?</Form.Label>
          <Form.Control
            type="checkbox"
            value={available}
            name="available"
            onChange={() => {
              setNewProd({ ...newProd, available: !available });
            }}
          />
        </Form.Group>
      </Form>
      <Button
        variant="primary"
        onClick={() => {
          console.log("hit");
          if (product_name !== "" && product_img !== "" && description !== "") {
            axios
              .post(`/api/products`, {
                product_name,
                product_img,
                price,
                description,
                available
              })
              .then(res => {
                console.log(res);
              });
          } else {
            alert("Fill in the input fields");
          }
          // setNewProd({
          //   product_name: "",
          //   product_img: "",
          //   price: 0,
          //   description: "",
          //   available: false
          // });
        }}
      >
        Add new product
      </Button>
      <h3>Delete Products:</h3>
      <ListGroup>{productsDelete}</ListGroup>
      <br />
    </div>
  );
};

const mapStateToProps = reduxState => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps)(Admin);
