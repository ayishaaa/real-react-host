import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "../css/style.module.css";
import { Link, useLocation } from "react-router-dom";
import img1 from "../assets/images/wallpaper/img4.jpg";
import regstyles from "../css/track.module.css";
import Footer from "./userFrontEnd/footer";
import TopNavBar from "./userFrontEnd/topNavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

function Track() {
  const [oid, setOid] = useState("");
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);

  useEffect(() => {
    const calculateTotalAmountPaid = () => {
      let totalPaid = 0;

      // Sum up the refunded amounts
      if (orders) {
        for (const item of orders.cartItems) {
          if (item.status === "Cancelled") {
            totalPaid += item.offerprice;
          }
        }
      }

      return totalPaid;
    };

    setTotalAmountPaid(calculateTotalAmountPaid());
  }, [orders]);

  const parseOrderId = (orderid) => {
    if (orderid) {
      const dateTimePart = orderid.split("-")[0];
      const year = dateTimePart.substring(0, 4);
      const month = dateTimePart.substring(4, 6);
      const day = dateTimePart.substring(6, 8);
      const hours = dateTimePart.substring(8, 10);
      const minutes = dateTimePart.substring(10, 12);
      const seconds = dateTimePart.substring(12, 14);

      const invoiceNumber = orderid.split("-")[1];

      const invoiceDate = `${year}-${month}-${day}`;
      const invoiceTime = `${hours}:${minutes}:${seconds}`;
      return {
        invoiceNumber,
        invoiceDate,
        invoiceTime,
      };
    } else {
      // Handle the case where orderid is undefined
      return {
        invoiceNumber: "",
        invoiceDate: "",
        invoiceTime: "",
      };
    }
  };

  const sendSubmit = (event) => {
    event.preventDefault();
    console.log({ oid });

    if (oid === "") {
      setError1("Enter Order Id");
    } else {
      axios
        .get(`http://localhost:8000/users/trackorder/${oid}`)
        .then((response) => {
          if (response.status === 200) {
            console.log("hello", response.data);
            setOrders(response.data.data);
            // window.location.href = "/verifyotp";
          }
        })
        .catch((error) => {
          setError1("Invalid Order Id");
          if (error.response && error.response.status === 400) {
            setError(error.response.data.error);
          }
        });
    }
  };

  const handleProductClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/users/detailproduct/${id}`);
      const selectedProduct = response.data;

      const state = {
        id,
        productName: selectedProduct.productName,
        price: selectedProduct.price,
        offerprice: selectedProduct.offerprice,
        description: selectedProduct.description,
        category: selectedProduct.category,
        tag: selectedProduct.tag,
        brand: selectedProduct.brand,
        material: selectedProduct.material,
        image: selectedProduct.images,
      };
      console.log(state);
      navigate(`/shopdetails`, { state });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelProductInOrder = async (orderId, productId) => {
    console.log(orderId, productId);
    try {
      const response = await axios.post(`http://localhost:8000/users/cancelorder/${orderId}`, {
        productId: productId,
      });
      if (response.data.success) {
        console.log("Cancellation request have been send to the Admin");
        toast.success("Order Cancellation request have been send to the Admin!", {
          position: "top-right",
          duration: 4000,
        });
      } else {
        console.error("Failed to cancel product in order.");
        toast.error("Failed to cancel product in order.", {
          position: "top-right",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("An error occurred while canceling the product in order.", error);
    }
  };

  return (
    <div>
      <TopNavBar />
      <Toaster />
      <div className={regstyles.body}>
        <div className={regstyles.container}>
          <div className={regstyles.cover}>
            <div className={regstyles.front}>
              {orders ? (
                <div className="container py-2 h-100">
                  <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-10 col-xl-12">
                      <div className={`card`} style={{ borderRadius: 10 }}>
                        <div className="card-header px-4 py-1">
                          <h5 className="text-muted mb-0">
                            Thanks for your Order,
                            <span style={{ color: "#a8729a" }}>
                              {" "}
                              {/* {userDetails.firstname} {userDetails.lastname} */}
                            </span>
                            !
                          </h5>
                        </div>
                        <div className={`card-body p-4 ${regstyles.cardHeight}`}>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="d-flex justify-content-between align-items-center mb-0">
                                <p className="lead fw-normal mb-0" style={{ color: "#a8729a" }}>
                                  Order Id
                                </p>
                                {/* <p className="small text-muted mb-0">Receipt Voucher : 1KAU9-84UIL</p> */}
                                <p className="small text-muted mb-0">{orders.orderId}</p>
                              </div>
                              {orders.cartItems.map((item, index) => (
                                <div key={index} className="card shadow-0 border mb-1">
                                  <div className="card-body">
                                    <div className="row">
                                      <div className="col-md-2">
                                        <div onClick={() => handleProductClick(item.id)}>
                                          <img
                                            src={item.image}
                                            className="img-fluid"
                                            alt={item.productName}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="col-md-4">
                                          <div className="text-center d-flex justify-content-center align-items-center">
                                            <p className="text-muted mb-0">{item.productName}</p>
                                          </div>
                                          <div className="text-center d-flex justify-content-center align-items-center">
                                            <p className="text-muted mb-0 small">
                                              Qty: {item.quantity}
                                            </p>
                                          </div>
                                          <div className="text-center d-flex justify-content-center align-items-center">
                                            <p className="text-muted mb-0 small">
                                              ₹ {item.offerprice}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      {/* <hr
                                        className="mb-4"
                                        style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                                      /> */}
                                      <div className="col-md-6">
                                        <div className="row d-flex align-items-center">
                                          <div className="col-md-5">
                                            <p className="text-muted mb-8 small">Track Order</p>
                                          </div>
                                          <div className="col-md-7 text-md-right">
                                            {item.status === "Cancelled" ? (
                                              <p
                                                className="text-muted mb-0"
                                                style={{ color: "red" }}
                                              >
                                                Order Cancelled
                                              </p>
                                            ) : (
                                              <button
                                                style={{
                                                  backgroundColor: "#a8729a",
                                                  color: "white",
                                                }}
                                                className="btn"
                                                onClick={() =>
                                                  handleCancelProductInOrder(
                                                    orders.orderId,
                                                    item.id
                                                  )
                                                }
                                              >
                                                Cancel Order
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                        <div className="row d-flex align-items-center">
                                          {/* <div className="col-md-2">
                                            <p className="text-muted mb-0 small">Track Order</p>
                                          </div> */}
                                          <div className="col-md-12">
                                            <div>
                                              <div
                                                className="progress"
                                                style={{ height: 6, borderRadius: 16 }}
                                              >
                                                {item.status === "Order Received" && (
                                                  <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{
                                                      width: "15%",
                                                      borderRadius: 16,
                                                      backgroundColor: "#a8729a",
                                                    }}
                                                    aria-valuenow={20}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                  />
                                                )}
                                                {item.status === "Packed" && (
                                                  <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{
                                                      width: "35%",
                                                      borderRadius: 16,
                                                      backgroundColor: "#a8729a",
                                                    }}
                                                    aria-valuenow={40}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                  />
                                                )}
                                                {item.status === "Shipped" && (
                                                  <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{
                                                      width: "50%",
                                                      borderRadius: 16,
                                                      backgroundColor: "#a8729a",
                                                    }}
                                                    aria-valuenow={60}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                  />
                                                )}
                                                {item.status === "Out for Delivery" && (
                                                  <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{
                                                      width: "70%",
                                                      borderRadius: 16,
                                                      backgroundColor: "#a8729a",
                                                    }}
                                                    aria-valuenow={80}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                  />
                                                )}
                                                {item.status === "Delivered" && (
                                                  <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{
                                                      width: "100%",
                                                      borderRadius: 16,
                                                      backgroundColor: "#a8729a",
                                                    }}
                                                    aria-valuenow={100}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                  />
                                                )}
                                                {item.status === "Cancelled" && (
                                                  <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{
                                                      width: "100%",
                                                      borderRadius: 16,
                                                      backgroundColor: "red",
                                                    }}
                                                    aria-valuenow={100}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                  />
                                                )}
                                              </div>
                                              <div className="d-flex justify-content-around mb-1">
                                                <p className="text-muted mt-1 mb-0 small ms-xl-4">
                                                  Order Placed
                                                </p>
                                                <p className="text-muted mt-1 mb-0 small ms-xl-4">
                                                  Packed
                                                </p>
                                                <p className="text-muted mt-1 mb-0 small ms-xl-4">
                                                  Shipped
                                                </p>
                                                <p className="text-muted mt-1 mb-0 small ms-xl-4">
                                                  Out for delivery
                                                </p>
                                                <p className="text-muted mt-1 mb-0 small ms-xl-4">
                                                  Delivered
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              <Row>
                                <Col className="col-6">
                                  <div className="d-flex justify-content-between pt">
                                    <div className="card shadow-0 border mb-2">
                                      <p className="fw-bold mb-0">Billing Details</p>
                                      <div className="card-body">
                                        <div className="row">
                                          <div className="col-md-35">
                                            <p className="text-muted mb-0">
                                              {orders.billingDetails.firstName}{" "}
                                              {orders.billingDetails.lastName}
                                            </p>
                                            <p className="text-muted mb-0">
                                              {orders.billingDetails.address1}
                                              {", "}
                                              {orders.billingDetails.address2}
                                            </p>
                                            <p className="text-muted mb-0">
                                              {orders.billingDetails.country}
                                              {", "}
                                              {orders.billingDetails.state}
                                              {", "}
                                              {orders.billingDetails.city}
                                            </p>
                                            <p className="text-muted mb-0">
                                              PIN : {orders.billingDetails.postcode}
                                            </p>
                                            <p className="text-muted mb-0">
                                              Phone : {orders.billingDetails.phone}
                                            </p>
                                            <p className="text-muted mb-0">
                                              {orders.billingDetails.email}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                                <Col className="col-6">
                                  <div className="d-flex justify-content-between pt">
                                    <div className="card shadow-0 border mb-2">
                                      <p className="fw-bold mb-0">Shipping Details</p>
                                      <div className="card-body">
                                        <div className="row">
                                          <div className="col-md-35">
                                            <p className="text-muted mb-0">
                                              {orders.shippingDetails.firstName}{" "}
                                              {orders.shippingDetails.lastName}
                                            </p>
                                            <p className="text-muted mb-0">
                                              {orders.shippingDetails.address1}
                                              {", "}
                                              {orders.shippingDetails.address2}
                                            </p>
                                            <p className="text-muted mb-0">
                                              {orders.shippingDetails.country}
                                              {", "}
                                              {orders.shippingDetails.state}
                                              {", "}
                                              {orders.shippingDetails.city}
                                            </p>
                                            <p className="text-muted mb-0">
                                              PIN : {orders.shippingDetails.postcode}
                                            </p>
                                            <p className="text-muted mb-0">
                                              Phone : {orders.shippingDetails.phone}
                                            </p>
                                            <p className="text-muted mb-0">
                                              {orders.shippingDetails.email}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                              <div className="col-md-8 justify-content-space-between">
                                <div className="d-flex justify-content-between pt-2">
                                  <p className="fw-bold mb-0">Order Details</p>
                                </div>
                                <div className="d-flex justify-content-between pt-2">
                                  <p className="text-muted mb-0">
                                    Invoice Number : {parseOrderId(orders.orderId).invoiceNumber}
                                  </p>
                                  <p className="text-muted mb-0">
                                    <span className="fw-bold me-4">Product Total</span>
                                    {orders.subtotal}
                                  </p>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <p className="text-muted mb-0">
                                    Invoice Date : {parseOrderId(orders.orderId).invoiceDate}
                                  </p>
                                  <p className="text-muted mb-0">
                                    <span className="fw-bold me-4">Discount</span>
                                    {orders.discountAmount}
                                  </p>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <p className="text-muted mb-0">
                                    Invoice Time : {parseOrderId(orders.orderId).invoiceTime}
                                  </p>
                                  <p className="text-muted mb-0">
                                    <span className="fw-bold me-4">Total</span>
                                    {orders.total}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="card-footer d-flex border-0 px-4 py-5"
                            style={{
                              backgroundColor: "#a8729a",
                              borderBottomLeftRadius: 10,
                              borderBottomRightRadius: 10,
                              justifyContent: "space-between",
                            }}
                          >
                            {orders.cartItems.some((item) => item.status === "Cancelled") && (
                              <h5 className="d-flex align-items-center text-white text-uppercase mb-0">
                                Amount Refunded:
                                <span className="h2 mb-0 ms-2">₹{totalAmountPaid}</span>
                              </h5>
                            )}
                            <h5 className="d-flex align-items-center text-white text-uppercase mb-0">
                              Total paid: <span className="h2 mb-0 ms-2">₹{orders.total}</span>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`card ${regstyles.cardHeight}`} style={{ borderRadius: 10 }}>
                  <img src={img1} alt="front" />
                  <div className={regstyles.text}>
                    <span className={regstyles.text1}>
                      Every new friend is a
                      <br />
                      new adventure
                    </span>
                    <span className={regstyles.text2}>Lets get connected</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={regstyles.forms}>
            <div className={regstyles.formcontent}>
              <div className={regstyles.loginform}>
                <div className={regstyles.title}>Track your Order</div>
                <form action="#">
                  <div className={regstyles.inputboxes}>
                    <div className={regstyles.inputbox}>
                      {/* <div className="col-md-2">
                        <FontAwesomeIcon icon={faTruck} style={{ color: "#a8729a" }} />
                      </div> */}
                      <i>
                        <FontAwesomeIcon icon={faTruck} />
                      </i>
                      {/* <i className="fas fa-user" /> */}
                      <input
                        type="text"
                        placeholder="Enter your OrderId"
                        value={oid}
                        onChange={(e) => setOid(e.target.value)}
                        required
                      />
                    </div>
                    {error1 && <p style={{ color: "red" }}>{error1}</p>}
                    <div className={`${regstyles.button} ${regstyles.inputbox}`}>
                      <input type="submit" onClick={sendSubmit} defaultValue="Send" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Track;
