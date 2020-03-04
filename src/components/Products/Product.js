import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

const Product = props => {
  const [product, setProduct] = useState({});
  console.log(product);
  useEffect(() => {
    axios.get(`/api/product/${props.match.params.id}`).then(res => {
      setProduct(res.data[0]);
    });
  }, []);
  return (
    <div>
      <section>{product.product_img}</section>
      <section>{product.product_name}</section>
      <section>{product.price}</section>
      <section>{product.description}</section>
      <button>add to cart</button>
    </div>
  );
};

export default withRouter(Product);
