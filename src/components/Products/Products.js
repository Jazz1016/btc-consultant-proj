import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/reducers/cartReducer";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = props => {
  const {
    product_id,
    product_name,
    product_img,
    price,
    description,
    available
  } = props.product;
  const { user_id } = props.user;
  //   console.log(props);
  return (
    <div>
      <Link to={`/product/${product_id}`}>
        <section>
          <h4>{product_name}</h4>
          <img src={product_img} />
          <h6>{price}</h6>
          <p>{description}</p>
        </section>
      </Link>
      <button
        onClick={() => {
          axios.post(`/api/carts`, { user_id, product_id }).then(res => {
            props.addToCart(res.data);
          });
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

const mapStateToProps = reduxState => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps, { addToCart })(Products);
