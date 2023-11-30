import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "../css/style.module.css";
import { Link, useLocation } from "react-router-dom";
import TopNavBar from "./userFrontEnd/topNavBar";
import Footer from "./userFrontEnd/footer";

function Invoice() {
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const orderId = location.state.orderId;
        const response = await fetch(`http://localhost:8000/users/detailorder/${orderId}`);
        const data = await response.json();
        if (data.status === "success") {
          setOrderData(data.data);
        } else {
          console.log("error in setOrderData");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrderData();
  }, [location.state.orderId]);

  const containerStyle = {
    marginLeft: "180px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const headingStyle = {
    marginBottom: "20px",
    borderBottom: "2px solid #333",
    paddingBottom: "10px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  };

  const thStyle = {
    background: "#f2f2f2",
    padding: "10px",
    textAlign: "left",
  };

  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  };

  const thStyleRight = {
    background: "#f2f2f2",
    padding: "10px",
    textAlign: "right",
  };

  const tdStyleRight = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "right",
  };

  return (
    <div>
      <TopNavBar />
      <div className={styles.container} style={containerStyle}>
        <Row className={styles.row}>
          <Col>
            <h2 style={headingStyle}>
              Invoice
              <label style={{ fontSize: "20px", marginLeft: "750px" }}>
                <Link style={{ color: "black" }} to="/home">
                  Back to Home
                </Link>
              </label>
            </h2>
            <p>
              <strong>Order ID:</strong> {orderData && orderData.orderId}
            </p>
            <h4>Order Summary</h4>
            <p>
              <strong>Order Date:</strong> {new Date().toLocaleDateString()}
            </p>
          </Col>
        </Row>
        {orderData && (
          <>
            <Row className={styles.row}>
              <Col>
                <h4 style={headingStyle}>Billing Details</h4>
                <p>
                  <strong>Name:</strong>
                  {orderData.billingDetails.firstName}
                  {orderData.billingDetails.lastName}
                </p>
                <p>
                  <strong>Address:</strong>
                  {orderData.billingDetails.address1},{orderData.billingDetails.address2},{" "}
                  {orderData.billingDetails.city},{orderData.billingDetails.state},
                  {orderData.billingDetails.postcode}
                </p>
                <p>
                  <strong>Phone:</strong> {orderData.billingDetails.phone}
                </p>
                <p>
                  <strong>Email:</strong> {orderData.billingDetails.email}
                </p>
              </Col>
              <Col>
                <h4 style={headingStyle}>Shipping Details</h4>
                <p>
                  <strong>Name:</strong>
                  {orderData.shippingDetails.firstName}
                  {orderData.shippingDetails.lastName}
                </p>
                <p>
                  <strong>Address:</strong>
                  {orderData.shippingDetails.address1},{orderData.shippingDetails.address2},{" "}
                  {orderData.shippingDetails.city},{orderData.shippingDetails.state},
                  {orderData.shippingDetails.postcode}
                </p>
                <p>
                  <strong>Phone:</strong> {orderData.shippingDetails.phone}
                </p>
                <p>
                  <strong>Email:</strong> {orderData.shippingDetails.email}
                </p>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col>
                <h4 style={headingStyle}>Order Details</h4>
                <table style={tableStyle} className={styles.table}>
                  <thead>
                    <tr>
                      <th style={thStyle}>#</th>
                      <th style={thStyle}>Product</th>
                      <th style={thStyle}>Quantity</th>
                      <th style={thStyleRight}>Price</th>
                      <th style={thStyleRight}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.cartItems.map((item, index) => (
                      <tr key={index}>
                        <td style={tdStyle}>{index + 1}</td>
                        <td style={tdStyle}>{item.productName}</td>
                        <td style={tdStyle}>{item.quantity}</td>
                        <td style={tdStyleRight}>₹{parseFloat(item.offerprice).toFixed(2)}</td>
                        <td style={tdStyleRight}>
                          ₹{(item.quantity * parseFloat(item.offerprice)).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}>
                        <strong>Subtotal:</strong>
                      </td>
                      <td style={tdStyleRight}>₹{parseFloat(orderData.subtotal).toFixed(2)}</td>
                    </tr>

                    {/* Discount row */}
                    <tr>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}>
                        <strong>Discount:</strong>
                      </td>
                      <td style={tdStyleRight}>
                        ₹{parseFloat(orderData.discountAmount).toFixed(2)}
                      </td>
                    </tr>

                    {/* Total row */}
                    <tr>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}>
                        <strong>Total:</strong>
                      </td>
                      <td style={tdStyleRight}>₹{parseFloat(orderData.total).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Invoice;
