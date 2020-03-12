import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./product.scss";

const Product = props => {
  const [product, setProduct] = useState({ price: 0 });
  console.log(product);
  useEffect(() => {
    axios.get(`/api/product/${props.match.params.id}`).then(res => {
      setProduct(res.data[0]);
    });
  }, [props.match.params.id]);
  const markedUp = product.price * 1.2;
  return (
    <div className="product-box-holder">
      <header className="product-header">
        <div></div>
      </header>
      <div className="prod-main-display">
        <img className="prod-img" src={product.product_img} />
        <section className="prod-pricing-box">
          <div>
            <h4>Bitcoin Trading and Investing</h4>
          </div>
          <p>
            Initial Price: <span className="crossed-out">${markedUp}</span>
          </p>
          <p>
            Temporary Low Price: <span>${product.price}</span>
          </p>
          <Button variant="success">Add to Cart</Button>
        </section>
      </div>
      <div className="prod-desc-box">
        <h4>{product.product_name}</h4>
        <div></div>
        <p>
          This book will bring you into 22nd century of investing. Watch as your
          bank account goes from ordinary to extraordinary. Brag to your friends
          about all the extra dough you got.
        </p>
      </div>
    </div>
  );
};

export default withRouter(Product);
