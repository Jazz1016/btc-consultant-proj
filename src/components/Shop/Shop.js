import React, { useState, useEffect } from "react";
import axios from "axios";
import Products from "../Products/Products";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`/api/products`).then(res => {
      setProducts(res.data);
    });
  }, []);
  // console.log(products);
  let productDisplay = products.map(product => {
    return <Products key={product.product_id} product={product} />;
  });
  return (
    <div>
      <header>Shop header</header>
      {productDisplay}
    </div>
  );
};

export default Shop;
