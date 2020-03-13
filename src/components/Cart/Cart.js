import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getCart } from "../../redux/reducers/cartReducer";
import StripeCheckout from "react-stripe-checkout";
import "./Cart.scss";
import { Button } from "react-bootstrap";

const Cart = props => {
  const { cart } = props.cartReducer;
  const { user_id } = props.userReducer.user;
  // console.log(props);
  useEffect(() => {
    // axios.get(`/api/products`).then(res => {
    //   setProductsArr(res.data);
    // });
  }, [cart]);
  let cartDisplay = cart.map(el => {
    return (
      <div className="checkout-product-card">
        <img src={el.product_img} alt={`${el.product_name}`} />
        <section>
          <h5>Program: </h5>
          <h6>{el.product_name}</h6>
        </section>
        <section>
          <p>Price: </p>
          <p>${el.price}</p>
        </section>

        <Button
          variant="danger"
          onClick={() => {
            axios.delete(`/api/carts/${el.cart_id}`);
            axios.get(`/api/carts/${user_id}`).then(res => {
              props.getCart(res.data);
            });
          }}
        >
          Remove
        </Button>
      </div>
    );
  });
  console.log(props);
  console.log(cart);
  const handleToken = (token, addresses) => {
    console.log(token, addresses);
  };
  const priceTotal = cart.reduce((acc, el) => {
    return acc + el.price;
  }, 0);

  return (
    <div className="cart-route">
      <header className="cart-header">Cart</header>
      <section className="cart-display">{cartDisplay}</section>
      <div className="checkout-final">
        <section>
          <p>Cart total:</p>
          <p className="cart-total-price">${priceTotal}.00</p>
        </section>
        <StripeCheckout
          className="checkout-button"
          stripeKey="pk_test_JX90Gydk81zBsYhy4xiikSXt00FkOAJVDb"
          token={handleToken}
          billingAddress
          shippingAddress
          amount={priceTotal * 100}
          name="Your cart"
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { getCart })(Cart);
