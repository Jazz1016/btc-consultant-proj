import React, { useState, useEffect } from "react";
import axios from "axios";
import Products from "../Products/Products";
// import { Link } from "react-router-dom";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`/api/products`).then(res => {
      setProducts(res.data);
    });
  }, []);
  // console.log(products);
  let productDisplay = products.map((product, i) => {
    return <Products key={product.product_id} product={product} />;
  });
  return (
    <div className="products-display">
      <header className="shop-header">Become an expert!</header>
      <section>{productDisplay}</section>
    </div>
  );
};

export default Shop;
