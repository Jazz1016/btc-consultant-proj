import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./product.scss";
import { connect } from "react-redux";
import { addToCart } from "../../redux/reducers/cartReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = props => {
  const { user_id } = props.user;
  const [product, setProduct] = useState({ price: 0 });
  console.log(product);
  useEffect(() => {
    axios.get(`/api/product/${props.match.params.id}`).then(res => {
      setProduct(res.data[0]);
    });
  }, [props.match.params.id]);
  const markedUp = product.price * 1.5;
  return (
    <div className="product-box-holder">
      <header className="product-header">
        <div></div>
      </header>
      <div className="prod-main-display">
        <img className="prod-img" alt="Product" src={product.product_img} />
        <section className="prod-pricing-box">
          <div>
            <h4>Bitcoin Trading and Investing</h4>
          </div>
          <p>
            Initial Price: <span className="crossed-out">${markedUp}.00</span>
          </p>
          <p className="get-it-now-text">
            Get it now for just: <span>${product.price}.00</span>
          </p>
          <Button
            variant="success"
            onClick={() => {
              const { product_id } = product;
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
            Add to Cart
          </Button>
        </section>
      </div>
      <div className="prod-desc-box">
        <h4>{product.product_name}</h4>
        <div></div>
        <p>{product.description}</p>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

const mapStateToProps = reduxState => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps, { addToCart })(withRouter(Product));
