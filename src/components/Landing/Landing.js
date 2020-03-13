import React, { useEffect, useState } from "react";
import Subscribe from "../Subscribe/Subscribe";
import { Link } from "react-router-dom";
import ImageFlip from "./ImageFlip/ImageFlip";
import Reviews from "../Reviews/Reviews";
import Products from "../Products/Products";
import axios from "axios";
import "./Landing.scss";
import meteor from "../../assets/meteor.svg";
import BlogsDisplay from "../Newsletter/BlogDisplay/BlogsDisplay";

const Landing = props => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`/api/products`).then(res => {
      setProducts(res.data);
    });
  }, []);
  // console.log(products);
  let productDisplay = products.map(product => {
    return (
      <Products
        className="landing-products"
        key={product.product_id}
        product={product}
      />
    );
  });
  return (
    <div className="landing-outermost">
      <section className="landing-holder">
        <section className="landing-text-box">
          <img src={meteor} alt="meteor logo" />
          <h4>Create a Fortune</h4>
          <p>Learn how to invest, save, and control your money</p>
          <Link to="/shop">View Programs ></Link>
        </section>
        <div className="landing-design">
          <div className="landing-design-bar">
            <div className="bottom-grey"></div>
            <div className="top-grey"></div>
          </div>
          <div className="landing-design-bar">
            <div className="bottom-pink"></div>
            <div className="top-pink"></div>
          </div>
          <div className="landing-design-bar">
            <div className="bottom-blue"></div>
            <div className="top-blue"></div>
          </div>
        </div>
        <Reviews />
        <ImageFlip />
        {/* <div className="flex-products-landing">{productDisplay}</div> */}
        <Subscribe />
        <br />
      </section>
    </div>
  );
};

export default Landing;
