import React, { useEffect, useState } from "react";
import styles from "css/style.module.css";
import { Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import search from "assets/img/icon/search.png";
import heart from "assets/img/icon/heart.png";
import cart from "assets/img/icon/cart.png";
import logo from "assets/img/logo.png";
import footerlogo from "assets/img/footer-logo.png";
import payment from "assets/img/payment.png";
import axios from "axios";

function TopNavBar() {
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));
  const [userDetails, setUserDetails] = useState(userProfile);
  const carts = JSON.parse(localStorage.getItem("cart"));
  const [cartItems, setCartItems] = useState(carts);
  const wishs = JSON.parse(localStorage.getItem("wishlist"));
  const [wishlist, setWishList] = useState(wishs);

  const calculateSubtotal = () => {
    let subtotal = 0;
    cartItems?.forEach((item) => {
      subtotal += item.quantity * item.offerprice;
    });
    return subtotal.toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());

    let discountAmount = 0;

    const total = subtotal - discountAmount;
    return {
      total: total.toFixed(2),
    };
  };
  const totalAndDiscount = calculateTotal();

  // useEffect(() => {
  //   const token = localStorage.getItem("usertoken");
  //   if (token) {
  //     // Set the Authorization header for all axios requests
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //     axios
  //       .get("http://localhost:8000/users/profile")
  //       .then((response) => {
  //         setUserDetails(response.data); // Set the user's name from the fetched data
  //       })
  //       .catch((error) => {
  //         if (error.response && error.response.status === 401) {
  //           // Redirect to registration if unauthorized
  //           window.location.href = "/user/registration";
  //         }
  //       });
  //   }
  // }, []);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__top}>
          <div className={styles.container}>
            <Row>
              <div className="col-lg-5 col-md-6">
                <div className={styles.header__top__left}>
                  <p>Free shipping, 30-day return or refund guarantee.</p>
                </div>
              </div>
              <div className="col-lg-7 col-md-5">
                <div className={styles.header__top__right}>
                  <div className={styles.header__top__links}>
                    {userDetails ? (
                      <Link to="/wishlist" className={styles.userAvatarName}>
                        <div className={styles.useravatar}>
                          <img src={userDetails.image} alt="User" />
                        </div>
                        <br />
                        <div className={styles.userName}>{userDetails.firstname}</div>
                      </Link>
                    ) : (
                      <a href="/user/registration">Sign in</a>
                    )}
                    <a href="/track">Track Order</a>
                    {/* <a href="#">FAQs</a> */}
                  </div>
                  {/* <div className={styles.header__top__hover}>
                    <span>
                      Usd
                      <i className="arrow_carrot-down" />
                    </span>
                    <ul>
                      <li>USD</li>
                      <li>EUR</li>
                      <li>USD</li>
                    </ul>
                  </div> */}
                </div>
              </div>
            </Row>
          </div>
        </div>
        <div className={styles.container}>
          <Row>
            <div className="col-lg-3 col-md-3">
              <div className={styles.header__logo}>
                <Link to="/home">
                  <Image src={logo} alt="" />
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <nav className={styles.header__menu}>
                {/*mobile-menu*/}
                <ul>
                  <li>
                    <Link to="/home">Home</Link>
                  </li>
                  <li>
                    <Link to="/shop">Shop</Link>
                  </li>
                  <li>
                    <a href="#">Pages</a>
                    <ul className={styles.dropdown}>
                      <li>
                        <a href="/about">About Us</a>
                      </li>
                      <li>
                        <a href="/blog">Blog</a>
                      </li>
                      <li>
                        <a href="/blogdetails">Blog Details</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="/contact">Contacts</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className={styles.header__nav__option}>
                {/* <a href="#" className={styles.searchswitch}>
                  <Image src={search} alt="search" />
                </a> */}
                <a href="/wishlist">
                  <Image src={heart} alt="heart" />
                  {wishlist ? <span>{wishlist.length}</span> : null}
                </a>
                <a href="/shopcart">
                  <Image src={cart} alt="cart" />
                  {carts ? <span>{carts.length}</span> : null}
                </a>
                <div className={styles.price}>₹{calculateSubtotal()}</div>
              </div>
            </div>
          </Row>
          <div className={styles.canvas__open}>
            <i className="fa fa-bars" />
          </div>
        </div>
      </header>
    </>
  );
}
export default TopNavBar;
