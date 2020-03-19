import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import { logout, checkUser } from "../../redux/reducers/userReducer";
import { getCart } from "../../redux/reducers/cartReducer";
import axios from "axios";
import { connect } from "react-redux";
import "./Header.scss";
import svgimg from "./assets/hamburger.svg";

const Header = props => {
  const { isadmin, user_id } = props.userReducer.user;
  const { getCart } = props;
  const [dropdown, toggleDropdown] = useState(false);

  useEffect(() => {
    props.checkUser();
    if (user_id) {
      axios.get(`/api/carts/${user_id}`).then(res => {
        getCart(res.data);
      });
    }
  }, []);
  return (
    <>
      {isadmin ? (
        <section className="header">
          <img
            src={svgimg}
            alt="click for dropdown"
            onClick={() => {
              toggleDropdown(!dropdown);
            }}
          />
          <Link
            className="meteor-header"
            to="/"
            onClick={() => {
              toggleDropdown(false);
            }}
          >
            <span>Meteor</span>
          </Link>

          <div
            className={dropdown ? "nav-bar" : "nav-bar hide-nav desktop-nav"}
          >
            <Link
              className=""
              to="/newsletter"
              onClick={() => {
                toggleDropdown(false);
              }}
            >
              <p>Newsletter</p>
            </Link>
            <Link
              to="/shop"
              onClick={() => {
                toggleDropdown(false);
              }}
            >
              <p>Shop</p>
            </Link>
            {/* <Link
              to="/about"
              onClick={() => {
                toggleDropdown(false);
              }}
            >
              <p>About</p>
            </Link> */}
            <Link
              to="/contact"
              onClick={() => {
                toggleDropdown(false);
              }}
            >
              <p>Contact</p>
            </Link>
            <Link
              to="/auth"
              onClick={() => {
                toggleDropdown(false);
              }}
            >
              <p>Login</p>
            </Link>
            <Link
              to="/cart"
              onClick={() => {
                toggleDropdown(false);
              }}
            >
              <p>Cart</p>
            </Link>
            <Link
              to="/admin"
              onClick={() => {
                toggleDropdown(false);
              }}
            >
              <p>Admin</p>
            </Link>
            <Link
              to="/member"
              onClick={() => {
                toggleDropdown(false);
              }}
            >
              <p>Members</p>
            </Link>
          </div>
        </section>
      ) : (
        <section className="header">
          <img
            src={svgimg}
            alt="click for dropdown"
            onClick={() => {
              toggleDropdown(!dropdown);
            }}
          />
          <Link
            className="meteor-header"
            to="/"
            onClick={() => {
              toggleDropdown(false);
            }}
          >
            <span>Meteor</span>
          </Link>
          <div
            className={dropdown ? "nav-bar" : "nav-bar hide-nav desktop-nav"}
          >
            <Link
              className=""
              to="/newsletter"
              onClick={() => {
                toggleDropdown(false);
              }}
            >
              <p>Newsletter</p>
            </Link>
            <Link
              to="/shop"
              onClick={() => {
                toggleDropdown(false);
              }}
            >
              <p>Shop</p>
            </Link>
            {/* <Link
              to="/about"
              onClick={() => {
                toggleDropdown(false);
              }}
            >
              <p>About</p>
            </Link> */}
            <Link
              to="/contact"
              onClick={() => {
                toggleDropdown(false);
              }}
            >
              <p>Contact</p>
            </Link>
            <Link
              to="/auth"
              onClick={() => {
                toggleDropdown(false);
              }}
            >
              <p>Login</p>
            </Link>
            <Link
              to="/cart"
              onClick={() => {
                toggleDropdown(false);
              }}
            >
              <p>Cart</p>
            </Link>
            <Link
              to="/member"
              onClick={() => {
                toggleDropdown(false);
              }}
            >
              <p>Members</p>
            </Link>
          </div>
        </section>
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
