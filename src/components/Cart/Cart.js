import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getCart } from "../../redux/reducers/cartReducer";

const Cart = props => {
  const { cart } = props.cartReducer;
  const { user_id } = props.userReducer.user;
  // console.log(props);
  useEffect(() => {}, [cart]);

  let cartDisplay = cart.map(el => {
    return (
      <div>
        <h6>{el.product_name}</h6>
        <img src={el.product_img} />
        <p>{el.price}</p>
        <button
          onClick={() => {
            axios.delete(`/api/carts/${el.cart_id}`);
            axios.get(`/api/carts/${user_id}`).then(res => {
              props.getCart(res.data);
            });
          }}
        >
          Remove
        </button>
      </div>
    );
  });
  return (
    <div>
      <header>Cart header</header>
      <section>{cartDisplay}</section>
      <section>
        Cart total:
        {cart.reduce((acc, el) => {
          return acc + el.price;
        }, 0)}
      </section>
      <button>Proceed to checkout</button>
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { getCart })(Cart);
