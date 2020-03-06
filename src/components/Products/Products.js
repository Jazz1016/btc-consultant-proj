import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/reducers/cartReducer";
import axios from "axios";
// import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./products.css";

const Products = props => {
  const {
    product_id,
    product_name,

    price,
    description
  } = props.product;
  const { user_id } = props.user;
  //   console.log(props);
  return (
    <div>
      <Card style={{ width: "18rem" }} className="product-card">
        <Card.Img
          variant="top"
          src="https://cdn02.nintendo-europe.com/media/images/08_content_images/others_2/kidsclub/new_noe_banners/H2x1_KidsClub_ReadAndDiscover_YoshisFacts.jpg"
        />
        <Card.Body>
          <Card.Title>{product_name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Card.Link to={`/product/${product_id}`}>Details</Card.Link>
          <Card.Link
            onClick={() => {
              axios.post(`/api/carts`, { user_id, product_id }).then(res => {
                props.addToCart(res.data);
              });
            }}
          >
            Add to cart
          </Card.Link>
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
