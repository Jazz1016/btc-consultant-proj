import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/reducers/cartReducer";
import axios from "axios";
// import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./products.scss";
import { Link } from "react-router-dom";

const Products = props => {
  const {
    product_id,
    product_name,
    price,
    description,
    product_img
  } = props.product;
  const { user_id } = props.user;
  console.log(props);
  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };
  return (
    <div>
      <Card style={{ width: "20rem" }} className="product-card">
        <Card.Img variant="top" src={`${product_img}`} />
        <Card.Body>
          <Card.Title style={{ "font-size": "20px" }}>
            {product_name}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
          <Card.Text>{truncateString(description, 30)}</Card.Text>
          <Link to={`/product/${product_id}`}>Details</Link>
          <Button
            className="products-button"
            onClick={() => {
              axios.post(`/api/carts`, { user_id, product_id }).then(res => {
                props.addToCart(res.data);
              });
            }}
          >
            Add to cart
          </Button>
        </Card.Body>
      </Card>
      {/* <Link to={`/product/${product_id}`}>
        <section>
          <h4>{product_name}</h4>
          <img src={product_img} />
          <h6>{price}</h6>
          <p>{description}</p>
        </section>
      </Link> */}
    </div>
  );
};

const mapStateToProps = reduxState => {
  return reduxState.userReducer;
};

export default connect(mapStateToProps, { addToCart })(Products);
