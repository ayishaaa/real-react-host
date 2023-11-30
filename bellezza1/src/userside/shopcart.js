import Footer from "./userFrontEnd/footer";
import TopNavBar from "./userFrontEnd/topNavBar";
import styles from "../css/style.module.css";
import { Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function Shopcart() {
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cartItems, setCartItems] = useState(initialCart);
  const [updatedCart, setUpdatedCart] = useState(initialCart);
  const [couponList, setCouponList] = useState([]);
  const [selectedCouponCode, setSelectedCouponCode] = useState("");
  const [userInputCoupon, setUserInputCoupon] = useState("");
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  const [isValidCoupon, setIsValidCoupon] = useState(true);

  const location = useLocation();

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    setUpdatedCart(updatedCart);
    setIsCartUpdated(true);
  };

  const handleIncrement = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCartItems(updatedCart);
    setUpdatedCart(updatedCart);
    setIsCartUpdated(true);
  };

  const handleDecrement = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCartItems(updatedCart);
    setUpdatedCart(updatedCart);
    setIsCartUpdated(true);
  };

  const handleUpdateCart = () => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setIsCartUpdated(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/listcoupon")
      .then((response) => {
        setCouponList(response.data);

        const selectedCouponFromStorage = localStorage.getItem("selectedCouponCode");
        if (
          selectedCouponFromStorage &&
          couponList.some((coupon) => coupon.code === selectedCouponFromStorage)
        ) {
          setSelectedCouponCode(selectedCouponFromStorage);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const enteredCoupon = userInputCoupon.trim().toUpperCase();
    const selectedCoupon = couponList.find((coupon) => coupon.code === enteredCoupon);
    if (selectedCoupon) {
      setSelectedCouponCode(enteredCoupon);
      localStorage.setItem("selectedCouponCode", JSON.stringify(selectedCoupon));
    }

    setIsValidCoupon(!!selectedCoupon);
  };

  const handleUserInputCoupon = (e) => {
    const userInput = e.target.value;
    setUserInputCoupon(userInput);
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += item.quantity * item.offerprice;
    });
    return subtotal.toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const selectedCoupon = couponList.find((coupon) => coupon.code === selectedCouponCode);

    let discountAmount = 0;
    if (selectedCoupon) {
      discountAmount = (subtotal * selectedCoupon.discount) / 100;
    }

    const total = subtotal - discountAmount;
    return {
      total: total.toFixed(2),
      discountAmount: isValidCoupon ? discountAmount.toFixed(2) : "0.00",
    };
  };
  const totalAndDiscount = calculateTotal();

  return (
    <div>
      {/* <div id="preloder">
        <div className={styles.loader} />
      </div> */}
      <div className={styles.offcanvasmenuoverlay} />
      <TopNavBar />
      <section className="breadcrumb-option">
        <div className={styles.container} style={{ marginLeft: "180px", marginTop: "30px" }}>
          <div className={styles.row}>
            <div className="col-lg-12">
              <div className={styles.breadcrumb__text}>
                <h4>Shopping Cart</h4>
                <div className={styles.breadcrumb__links}>
                  <a href="/home">Home</a>
                  <a href="/shop">Shop</a>
                  <span>Shopping Cart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.shoppingcart} ${styles.spad}`}>
        <div className={styles.container} style={{ marginLeft: "130px" }}>
          <Row className={styles.row}>
            <div className="col-lg-8">
              <div className={styles.shopping__cart__table}>
                <table>
                  <thead>
                    <tr style={{ textAlign: "justify" }}>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <td className={styles.product__cart__item}>
                          <div className={styles.product__cart__item__pic}>
                            <img
                              src={item.image}
                              alt="Product"
                              style={{ height: "100px", width: "70px" }}
                            />
                          </div>
                          <div className={styles.product__cart__item__text}>
                            <h6>{item.productName}</h6>
                            <h5>
                              ₹{item.offerprice}
                              <br />
                              <span>₹{item.price}</span>
                            </h5>
                          </div>
                        </td>
                        <td className={styles.quantity__item}>
                          <div className={styles.quantity}>
                            <div className={styles.proqty2}>
                              <button onClick={() => handleDecrement(item.id)}>-</button>
                              <input
                                type="text"
                                value={item.quantity || 1}
                                onChange={(e) => {
                                  const newQuantity = parseInt(e.target.value) || 1;
                                  handleSetQuantity(item.id, newQuantity);
                                }}
                                readOnly
                              />
                              <button onClick={() => handleIncrement(item.id)}>+</button>
                            </div>
                          </div>
                        </td>
                        <td className={styles.cart__price}>₹{item.quantity * item.offerprice}</td>
                        <td className={styles.cart__close}>
                          <i
                            className="fa fa-close"
                            onClick={() => handleRemoveFromCart(item.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Row className={styles.row}>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className={styles.continue__btn}>
                    <a href="/shop">Continue Shopping</a>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className={`${styles.continue__btn} ${styles.update__btn}`}>
                    <a onClick={handleUpdateCart} style={{ color: "white" }}>
                      <i className="fa fa-spinner" />
                      Update cart
                    </a>
                  </div>
                </div>
              </Row>
            </div>
            <div className="col-lg-4">
              <div className={styles.cart__discount}>
                <h6>Discount codes</h6>
                <form action="#">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={userInputCoupon}
                    onChange={handleUserInputCoupon}
                    style={{ textTransform: "uppercase" }}
                  />
                  <button onClick={handleApplyCoupon} type="submit">
                    Apply
                  </button>
                </form>
                {!isValidCoupon && <div style={{ color: "red" }}>Enter a valid Coupon code</div>}
                {isValidCoupon && selectedCouponCode && (
                  <div style={{ color: "green" }}>Coupon applied successfully</div>
                )}
              </div>
              <div className={styles.cart__total}>
                <h6>Cart total</h6>
                <ul>
                  <li>
                    Subtotal
                    <span>₹{calculateSubtotal()}</span>
                  </li>
                  <li>
                    Discount
                    <span>₹{totalAndDiscount.discountAmount}</span>
                  </li>
                  <li>
                    Total
                    <span>₹{totalAndDiscount.total}</span>
                  </li>
                </ul>
                <a href="/checkout" className={styles.primarybtn}>
                  Proceed to checkout
                </a>
              </div>
            </div>
          </Row>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Shopcart;
