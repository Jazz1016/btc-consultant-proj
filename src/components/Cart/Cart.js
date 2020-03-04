import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

const Cart = props => {
  // console.log(props);
  // const [cartList, setCartList] = useState([]);
  useEffect(() => {}, []);
  let cartDisplay = "cartListMapped";
  return <div>{cartDisplay}</div>;
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Cart);
