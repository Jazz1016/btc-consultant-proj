import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/reducers/cartReducer";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import "./products.scss";
import { Link, withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = props => {
  const {
    product_id,
    product_name,
    price,
    description,
    product_img
  } = props.product;
  const { user_id } = props.user;
  console.log(user_id);
  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };
  return (
    <div>
      <Card style={{ width: "20rem" }} className="product-card">
        <Card.Img
          onClick={() => {
            props.history.push(`/product/${product_id}`);
          }}
          style={{ width: "317.5px", height: "370px" }}
          variant="top"
          src={`${product_img}`}
        />
        <Card.Body className="boot-card-body">
          <Card.Title className="boot-card-name">{product_name}</Card.Title>
          <Card.Text className="text-muted">
            {truncateString(description, 30)}
          </Card.Text>
          <Card.Subtitle className="mb-2 text-bold">${price}</Card.Subtitle>
          <div>
            <Link to={`/product/${product_id}`}>Details</Link>
            <Button
              className="products-button"
              onClick={() => {
                console.log("hit");
                axios
                  .post(`/api/carts`, { user_id, product_id })
                  .then(res => {
                    props.addToCart(res.data);
                    toast.success("added to cart", {
                      position: toast.POSITION.BOTTOM_RIGHT
                    });
                  })
                  .catch(() => {
                    toast.error("Please Log in or register to add to cart", {
                      position: toast.POSITION.BOTTOM_RIGHT
                    });
                  });
              }}
            >
              Add to cart
            </Button>
          </div>
        </Card.Body>
      </Card>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

const mapStateToProps = reduxState => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps, { addToCart })(withRouter(Products));
