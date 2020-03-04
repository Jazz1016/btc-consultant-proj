import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Header.css";
import { logout, checkUser } from "../../redux/reducers/userReducer";
import { getCart } from "../../redux/reducers/cartReducer";
import axios from "axios";
import { connect } from "react-redux";

const Header = props => {
  const { isadmin, user_id } = props.userReducer.user;
  const { getCart } = props;
  useEffect(() => {
    props.checkUser();
    if (user_id) {
      axios.get(`/api/carts/${user_id}`).then(res => {
        getCart(res.data);
      });
    }
  }, [user_id]);
  return (
    <>
      {isadmin ? (
        <div className="nav-bar">
          <Link to="/">
            <p>home</p>
          </Link>
          <Link to="/auth">
            <p>login</p>
          </Link>
          {/* <Link to="/"><p>blog</p></Link> */}
          <Link to="/cart">
            <p>cart</p>
          </Link>
          <Link to="/contact">
            <p>contact</p>
          </Link>
          {/* <Link to="/"><p>landing</p></Link> */}
          <Link to="/newsletter">
            <p>Newsletter</p>
          </Link>
          <Link to="/shop">
            <p>shop</p>
          </Link>
          <Link to="/admin">
            <p>admin</p>
          </Link>
        </div>
      ) : (
        <div className="nav-bar">
          <Link to="/">
            <p>home</p>
          </Link>
          <Link to="/auth">
            <p>login</p>
          </Link>
          {/* <Link to="/"><p>blog</p></Link> */}
          <Link to="/cart">
            <p>cart</p>
          </Link>
          <Link to="/contact">
            <p>contact</p>
          </Link>
          {/* <Link to="/"><p>landing</p></Link> */}
          <Link to="/newsletter">
            <p>Newsletter</p>
          </Link>
          <Link to="/shop">
            <p>shop</p>
          </Link>
          {/* <Link to="/"></Link> */}
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { logout, checkUser, getCart })(
  withRouter(Header)
);
