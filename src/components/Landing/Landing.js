import React, { useEffect, useState } from "react";
import Subscribe from "../Subscribe/Subscribe";
import { useScrollTrigger } from "@material-ui/core";
import ImageFlip from "./ImageFlip/ImageFlip";
import Reviews from "../Reviews/Reviews";
import Products from "../Products/Products";
import axios from "axios";
import "./Landing.css";

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
    <div>
      <section className="landing-holder">
        <Subscribe />
        <ImageFlip />
        <Reviews />
        <div className="flex-products-landing">{productDisplay}</div>
        <Subscribe />
        <br />
      </section>
    </div>
  );
};

export default Landing;
