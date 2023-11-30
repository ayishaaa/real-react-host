import { Button, Card, Col, Form, Image, Nav, Row, Tab } from "react-bootstrap";
import cart from "assets/img/icon/cart.png";
import bgimage from "assets/images/wallpaper/prbg.jpg";
import styles from "../css/wish.module.css";
import style from "../css/style.module.css";
import TopNavBar from "./userFrontEnd/topNavBar";
import Footer from "./userFrontEnd/footer";
import { Dialog, DialogActions, DialogContent, DialogTitle, Icon } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const userProfile = JSON.parse(localStorage.getItem("userProfile")); // Parse the userProfile data
  const [userDetails, setUserDetails] = useState(userProfile);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const token = localStorage.getItem("usertoken");
  const [imagePreview, setImagePreview] = useState("");
  const [previousImage, setPreviousImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate("");
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [itemsPerPage] = useState(4);
  const [itemsPerPageo] = useState(1);
  const [orders, setOrders] = useState([]);
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);
  const [orderid, setOrderId] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!userProfile);
  const [totalAmountPaids, setTotalAmountPaids] = useState(0);
  const [totalAmountPaidss, setTotalAmountPaidss] = useState(0);

  const calculateRefundForOrder = (order) => {
    let totalRefund = 0;

    if (order && order.cartItems) {
      for (const item of order.cartItems) {
        if (item.status === "Cancelled") {
          totalRefund += item.offerprice;
        }
      }
    }

    return totalRefund;
  };

  useEffect(() => {
    const calculateTotalAmountPaid = () => {
      let totalPaid = 0;

      if (orders) {
        for (const order of orders) {
          // Assuming each order has a cartItems property
          if (order.cartItems) {
            for (const item of order.cartItems) {
              if (item.status === "Cancelled") {
                totalPaid += item.offerprice;
              }
            }
          }
        }
      }

      return totalPaid;
    };

    setTotalAmountPaids(calculateTotalAmountPaid());
  }, [orders]);

  const indexOfLastWishlistItem = currentPage * itemsPerPage;
  const indexOfFirstWishlistItem = indexOfLastWishlistItem - itemsPerPage;
  const currentWishlistItems = wishlist.slice(indexOfFirstWishlistItem, indexOfLastWishlistItem);
  // Orders rendering
  const indexOfLastOrderItem = currentPage * itemsPerPageo;
  const indexOfFirstOrderItem = indexOfLastOrderItem - itemsPerPageo;
  const currentOrderItems = orders.slice(indexOfFirstOrderItem, indexOfLastOrderItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    setLoading(true);

    const formData = {
      curpass: currentPassword,
      newpass: newPassword,
      conpass: confirmPassword,
    };

    try {
      const response = await axios.post(
        `http://localhost:8000/users/changepassword/${userDetails.id}`,
        formData
      );

      if (response.data.success) {
        setMessage("Password changed successfully!");
      } else {
        setMessage("Failed to change password. Please try again.");
      }
      window.location.href = "/wishlist";
    } catch (error) {
      setMessage("An error occurred while changing password.");
      console.error(error);
    } finally {
      setLoading(false);
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
        toast.success("Order cancellation request have been send!", {
          position: "top-right",
          duration: 4000,
        });
      } else {
        console.error("Failed to cancel product in order.");
      }
    } catch (error) {
      console.error("An error occurred while canceling the product in order.", error);
    }
  };

  useEffect(() => {
    const calculateTotalAmountPaid = () => {
      let totalPaid = 0;
      for (const order of orders) {
        totalPaid += order.total;
      }
      return totalPaid;
    };

    setTotalAmountPaid(calculateTotalAmountPaid());
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/users/detailorders/${userDetails.id}`
      );
      console.log("Orders response:", response.data.data); // Add this line to check the response
      const oid = response.data.data.orderId;
      setOrderId(oid);
      // Check if the response is an array of orders or a single order
      if (Array.isArray(response.data.data)) {
        setOrders(response.data.data);
      } else {
        setOrders([response.data.data]); // Convert single order to an array
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      Image: selectedImage,
    }));
    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onloadend = () => {
      var base64Image = reader.result;
      setImagePreview(base64Image);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var base64Image = imagePreview && imagePreview !== previousImage ? imagePreview : previousImage;

    setLoading(true);
    var formData = {
      firstName: userDetails.firstname,
      lastName: userDetails.lastname,
      Username: userDetails.username,
      Password: userDetails.password,
      Email: userDetails.email,
      Country: userDetails.country,
      State: userDetails.state,
      Phone: userDetails.phone,
      Image: base64Image,
    };
    console.log(formData);
    try {
      const response = axios.post(
        `http://localhost:8000/users/edituser/${userDetails.id}`,
        formData
      );
      console.log(response);
      const updatedUserProfile = { ...userDetails, image: base64Image };
      localStorage.setItem("userProfile", JSON.stringify(updatedUserProfile));

      setUserDetails(updatedUserProfile);
      window.location.href = "/wishlist";
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/wishlist");
  };

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }, []);

  useEffect(() => {
    setActiveTab("tabs-2");
  }, []);

  useEffect(() => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(existingWishlist);
    const storedUserProfile = JSON.parse(localStorage.getItem("userProfile")) || {}; // Provide a default value
    setPreviousImage(storedUserProfile.image);
  }, []);

  const clearWishlist = () => {
    if (wishlist.length > 0) {
      setConfirmationDialogOpen(true);
    }
  };

  const handleConfirmClearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("wishlist");
    closeConfirmationDialog();
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const handleConfirmClearProduct = (productId) => {
    const updatedWishlist = wishlist.filter((product) => product.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    closeConfirmationDialog();
  };

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const productsToAdd = wishlist.filter((product) => {
      return !existingCart.some((item) => item.id === product.id); // Change '_id' to 'id'
    });

    console.log("Existing Cart:", existingCart);
    console.log("Products to Add:", productsToAdd);

    if (productsToAdd.length > 0) {
      const updatedCart = [...existingCart, ...productsToAdd];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setIsAddedToCart(true);
      setMessage("Products added!");
    } else {
      setIsAddedToCart(false);
      setMessage("All products are already in the cart.");
    }
  };

  const handleAddToCartItem = (product) => {
    console.log("Product being added to cart:", product);
    const cartItem = {
      id: product.id,
      productName: product.productName,
      price: product.price,
      offerprice: product.offerprice,
      image: product.image,
      quantity: 1,
    };
    console.log(cartItem);
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductInCart = existingCart.some((item) => item.id === cartItem.id);
    if (!isProductInCart) {
      existingCart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(existingCart));
      console.log("Product added to cart!");
    } else {
      console.log("Product is already in the cart.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usertoken");
    localStorage.removeItem("userProfile");
    window.location.href = "/user/registration";
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      <Toaster />
      <TopNavBar />
      <div className={styles.body2}>
        <Tab.Container activeKey={activeTab} className="container padding-bottom-3x mb-2">
          <Row className="row">
            <div className="col-lg-5">
              <aside className={styles.userinfowrapper}>
                <div className={styles.usercover} />
                <div className={styles.userinfo}>
                  {isLoggedIn && (
                    <div className={styles.useravatar}>
                      {/* <a className={styles.editavatar} href="#" /> */}
                      <img src={userDetails.image} alt="User" />
                    </div>
                  )}
                  {isLoggedIn && (
                    <div className={styles.userdata}>
                      <h4>
                        {userDetails.firstname} {userDetails.lastname}
                      </h4>
                      <br />
                      <h5> Contact me: {userDetails.phone}</h5>
                      <span>Email me: {userDetails.email}</span>
                      <h6>
                        {userDetails.country}, {userDetails.state}
                      </h6>
                    </div>
                  )}
                </div>
              </aside>
              <Nav className={styles.listgroup}>
                {isLoggedIn && (
                  <Nav.Link
                    className={styles.listgroupitem}
                    href="#"
                    eventKey="tabs-1"
                    onClick={() => handleTabClick("tabs-1")}
                    style={{ color: activeTab === "tabs-1" ? "black" : "" }}
                  >
                    <i className="fa fa-user" />
                    Edit Profile
                  </Nav.Link>
                )}
                <Nav.Link
                  className={`${styles.listgroupitem} ${styles.withbadge}`}
                  // href="/order"
                  eventKey="tabs-2"
                  onClick={() => handleTabClick("tabs-2")}
                  style={{ color: activeTab === "tabs-2" ? "black" : "" }}
                >
                  <i className=" fa fa-th" />
                  Orders
                  <span className={`${styles.badge} ${styles.badgeprimary}`}>{orders.length}</span>
                </Nav.Link>
                <Nav.Link
                  className={`${styles.listgroupitem} ${styles.withbadge} ${styles.active}`}
                  href="#"
                  eventKey="tabs-3"
                  onClick={() => handleTabClick("tabs-3")}
                  style={{ color: activeTab === "tabs-3" ? "black" : "" }}
                >
                  <i className="fa fa-heart" />
                  Wishlist
                  <span className={`${styles.badge} ${styles.badgeprimary}`}>
                    {wishlist.length}
                  </span>
                </Nav.Link>
                {isLoggedIn && (
                  <Nav.Link
                    className={`${styles.listgroupitem} ${styles.withbadge} ${styles.active}`}
                    href="#"
                    eventKey="tabs-4"
                    onClick={() => handleTabClick("tabs-4")}
                    style={{ color: activeTab === "tabs-4" ? "black" : "" }}
                  >
                    <Icon>
                      <span className="material-symbols-sharp">key</span>
                    </Icon>
                    {""} Change Password
                  </Nav.Link>
                )}
                {isLoggedIn && (
                  <a
                    className={`${styles.listgroupitem} ${styles.withbadge}`}
                    onClick={handleLogout}
                  >
                    <Icon>
                      <span className="material-symbols-sharp">logout</span>
                    </Icon>
                    {""} Log Out
                  </a>
                )}
              </Nav>
            </div>
            <Tab.Content className="col-lg-6">
              <div className="padding-top-2x mt-2 hidden-lg-up" />
              {isLoggedIn && (
                <Tab.Pane eventKey="tabs-1">
                  <Card style={{ marginTop: "70px", marginBottom: "90px" }}>
                    <MDBox
                      variant="gradient"
                      style={{ backgroundColor: "black" }}
                      borderRadius="lg"
                      coloredShadow="success"
                      mx={3}
                      mt={-8}
                      p={3}
                      mb={-1}
                      textAlign="center"
                    >
                      <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        EDIT USER
                      </MDTypography>
                      <MDTypography display="block" variant="button" color="white" my={1}>
                        Edit the details
                      </MDTypography>
                    </MDBox>
                    <MDBox pt={4} pb={3} px={3}>
                      <MDBox component="form" role="form" style={{ fontSize: "20px" }}>
                        <MDBox mb={2}>
                          <MDInput
                            type="text"
                            label="First Name"
                            name="firstname"
                            value={userDetails.firstname}
                            onChange={handleChange}
                            variant="standard"
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDInput
                            type="text"
                            label="Last Name"
                            name="lastname"
                            value={userDetails.lastname}
                            onChange={handleChange}
                            variant="standard"
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDInput
                            type="text"
                            label="Username"
                            name="username"
                            value={userDetails.username}
                            onChange={handleChange}
                            variant="standard"
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDInput
                            type="email"
                            label="Email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleChange}
                            variant="standard"
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDInput
                            type="text"
                            label="Country"
                            name="country"
                            value={userDetails.country}
                            onChange={handleChange}
                            variant="standard"
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDInput
                            type="text"
                            label="State"
                            name="state"
                            value={userDetails.state}
                            onChange={handleChange}
                            variant="standard"
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDInput
                            type="number"
                            label="Phone"
                            name="phone"
                            value={userDetails.phone}
                            onChange={handleChange}
                            variant="standard"
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDInput
                            type="file"
                            label="Profile Image"
                            onChange={handleImageChange}
                            variant="standard"
                            fullWidth
                          />
                        </MDBox>
                        {previousImage && (
                          <div>
                            {/* <h5>Previous Image:</h5> */}
                            <img
                              src={previousImage}
                              alt="Previous Profile Image"
                              style={{ maxWidth: "100%", height: "auto" }}
                            />
                          </div>
                        )}
                        {imagePreview && (
                          <MDBox mb={2}>
                            <h5>New Image:</h5>
                            <img
                              src={imagePreview}
                              alt="Profile Preview"
                              style={{ maxWidth: "100%", height: "auto" }}
                            />
                          </MDBox>
                        )}
                        <MDBox mt={4} mb={1}>
                          <MDButton
                            onClick={handleSubmit}
                            variant="gradient"
                            style={{ backgroundColor: "black", color: "white" }}
                            disabled={loading}
                            fullWidth
                          >
                            {loading ? "Updating..." : "Edit User"}
                          </MDButton>
                          <MDButton
                            onClick={handleCancel}
                            variant="gradient"
                            style={{ backgroundColor: "black", color: "white" }}
                            fullWidth
                            disabled={loading}
                            sx={{ marginTop: "1rem" }}
                          >
                            Cancel
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </Card>
                </Tab.Pane>
              )}
              <Tab.Pane eventKey="tabs-2">
                <div className="container py-2 h-100">
                  <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-10 col-xl-12">
                      <div className="card" style={{ borderRadius: 10, width: "650px" }}>
                        {isLoggedIn && (
                          <div className="card-header px-4 py-1">
                            <h5 className="text-muted mb-0">
                              Thanks for your Order,
                              <span style={{ color: "#a8729a" }}>
                                {" "}
                                {userDetails.firstname} {userDetails.lastname}
                              </span>
                              !
                            </h5>
                          </div>
                        )}
                        {currentOrderItems.map((order, index) => (
                          <div key={order._id} className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-0">
                              <p className="lead fw-normal mb-0" style={{ color: "#a8729a" }}>
                                Order Id
                              </p>
                              {/* <p className="small text-muted mb-0">Receipt Voucher : 1KAU9-84UIL</p> */}
                              <p className="small text-muted mb-0">{order.orderId}</p>
                            </div>
                            {order.cartItems.map((item, index) => (
                              <div key={index} className="card shadow-0 border mb-1">
                                <div className="card-body">
                                  <div className="row">
                                    <div
                                      className="col-sm-2"
                                      onClick={() => handleProductClick(item.id)}
                                    >
                                      <img
                                        src={item.image}
                                        className="img-fluid"
                                        alt={item.productName}
                                      />
                                    </div>
                                    <div className="col-md-3 text-center d-flex justify-content-center align-items-center">
                                      <p className="text-muted mb-0">{item.productName}</p>
                                    </div>
                                    <div className="col-md-3 text-center d-flex justify-content-center align-items-center">
                                      <p className="text-muted mb-0 small">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="col-md-3 text-center d-flex justify-content-center align-items-center">
                                      <p className="text-muted mb-0 small">₹ {item.offerprice}</p>
                                    </div>
                                  </div>
                                  <hr
                                    className="mb-4"
                                    style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                                  />
                                  <div className="row d-flex align-items-center">
                                    <div className="col-md-5">
                                      <p className="text-muted mb-8 small">Track Order</p>
                                    </div>
                                    <div className="col-md-7 text-md-right">
                                      {item.status === "Cancelled" ? (
                                        <p className="text-muted mb-0" style={{ color: "red" }}>
                                          Order Cancelled
                                        </p>
                                      ) : (
                                        <button
                                          style={{ backgroundColor: "#a8729a", color: "white" }}
                                          className="btn"
                                          onClick={() =>
                                            handleCancelProductInOrder(order.orderId, item.id)
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
                                            {order.billingDetails.firstName}{" "}
                                            {order.billingDetails.lastName}
                                          </p>
                                          <p className="text-muted mb-0">
                                            {order.billingDetails.address1}
                                            {", "}
                                            {order.billingDetails.address2}
                                          </p>
                                          <p className="text-muted mb-0">
                                            {order.billingDetails.country}
                                            {", "}
                                            {order.billingDetails.state}
                                            {", "}
                                            {order.billingDetails.city}
                                          </p>
                                          <p className="text-muted mb-0">
                                            PIN : {order.billingDetails.postcode}
                                          </p>
                                          <p className="text-muted mb-0">
                                            Phone : {order.billingDetails.phone}
                                          </p>
                                          <p className="text-muted mb-0">
                                            {order.billingDetails.email}
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
                                            {order.shippingDetails.firstName}{" "}
                                            {order.shippingDetails.lastName}
                                          </p>
                                          <p className="text-muted mb-0">
                                            {order.shippingDetails.address1}
                                            {", "}
                                            {order.shippingDetails.address2}
                                          </p>
                                          <p className="text-muted mb-0">
                                            {order.shippingDetails.country}
                                            {", "}
                                            {order.shippingDetails.state}
                                            {", "}
                                            {order.shippingDetails.city}
                                          </p>
                                          <p className="text-muted mb-0">
                                            PIN : {order.shippingDetails.postcode}
                                          </p>
                                          <p className="text-muted mb-0">
                                            Phone : {order.shippingDetails.phone}
                                          </p>
                                          <p className="text-muted mb-0">
                                            {order.shippingDetails.email}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            <div className="d-flex justify-content-between pt-2">
                              <p className="fw-bold mb-0">Order Details</p>
                            </div>
                            <div className="d-flex justify-content-between pt-2">
                              <p className="text-muted mb-0">
                                Invoice Number : {parseOrderId(order.orderId).invoiceNumber}
                              </p>
                              <p className="text-muted mb-0">
                                <span className="fw-bold me-4">Product Total</span>
                                {order.subtotal}
                              </p>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p className="text-muted mb-0">
                                Invoice Date : {parseOrderId(order.orderId).invoiceDate}
                              </p>
                              <p className="text-muted mb-0">
                                <span className="fw-bold me-4">Discount</span>
                                {order.discountAmount}
                              </p>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p className="text-muted mb-0">
                                Invoice Time : {parseOrderId(order.orderId).invoiceTime}
                              </p>
                              <p className="text-muted mb-0">
                                <span className="fw-bold me-4">Total</span>
                                {order.total}
                              </p>
                            </div>
                            <div
                              className="card-footer border-0 px-0 py-5 d-flex"
                              style={{
                                backgroundColor: "#a8729a",
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                justifyContent: "space-between",
                              }}
                            >
                              {order && (
                                <h5
                                  key={index}
                                  className="d-flex align-items-center text-white text-uppercase mb-0"
                                >
                                  Amount Refunded:
                                  <span className="h2 mb-0 ms-2">
                                    ₹{calculateRefundForOrder(order)}
                                  </span>
                                </h5>
                              )}
                              <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                                Total paid: <span className="h2 mb-0 ms-2">₹{order.total}</span>
                              </h5>
                            </div>
                          </div>
                        ))}
                        <div className={styles.pagination}>
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === Math.ceil(orders.length / itemsPerPageo)}
                          >
                            Next
                          </button>
                        </div>
                        {/* <div
                          className="card-footer border-0 px-4 py-5 d-flex"
                          style={{
                            backgroundColor: "#a8729a",
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            justifyContent: "space-between",
                          }}
                        >
                          <h5 className="d-flex align-items-center text-white text-uppercase mb-0">
                            Total Amount Refunded:
                            <span className="h2 mb-0 ms-2">₹{totalAmountPaids}</span>
                          </h5>
                          <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                            Total paid: <span className="h2 mb-0 ms-2">₹{totalAmountPaid}</span>
                          </h5>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="tabs-3">
                <div className={styles.wishlisttable}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th style={{ width: "350px" }}>Product Name</th>
                        <th className="text-center">
                          <button
                            className={`${styles.btn} btn-sm btn-outline-danger`}
                            style={{
                              borderColor: "red",
                              color: "black",
                              borderRadius: "5%",
                              fontSize: "small",
                              width: "120px",
                            }}
                            onClick={clearWishlist}
                          >
                            Clear Wishlist
                          </button>
                          {message ? (
                            <span
                              style={{ color: isAddedToCart ? "green" : "red", fontWeight: "bold" }}
                            >
                              {message}
                            </span>
                          ) : (
                            <button
                              className={`${styles.btn} btn-sm btn-outline-success`}
                              style={{
                                borderColor: "green",
                                color: "black",
                                borderRadius: "5%",
                                fontSize: "small",
                                width: "120px",
                              }}
                              onClick={handleAddToCart}
                            >
                              Add to Cart
                            </button>
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentWishlistItems.map((product, index) => (
                        <tr key={index}>
                          <td onClick={() => handleProductClick(product.id)}>
                            <Image
                              src={product.image}
                              style={{ height: "160px", width: "130px" }}
                            />
                            <h5>{product.productName}</h5>
                            <p>Offer price: ₹ {product.offerprice}</p>
                          </td>
                          <td className="text-center">
                            <a onClick={() => handleAddToCartItem(product)} href="#">
                              <Image src={cart} alt="cart" />
                            </a>
                          </td>
                          <td className="text-center">
                            <a
                              className={styles.removefromcart}
                              onClick={() => handleConfirmClearProduct(product.id)}
                            >
                              <Icon>close</Icon>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <div className={styles.pagination}>
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === Math.ceil(wishlist.length / itemsPerPage)}
                      >
                        Next
                      </button>
                    </div>
                  </table>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="tabs-4">
                <Card style={{ marginTop: "150px", marginBottom: "90px" }}>
                  <MDBox
                    variant="gradient"
                    style={{ backgroundColor: "black" }}
                    borderRadius="lg"
                    coloredShadow="success"
                    mx={3}
                    mt={-8}
                    p={3}
                    mb={-1}
                    textAlign="center"
                  >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                      CHANGE PASSWORD
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                      Change your password here
                    </MDTypography>
                  </MDBox>
                  <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form" style={{ fontSize: "20px" }}>
                      <MDBox mb={2}>
                        <MDInput
                          type="password"
                          label="Current Password"
                          name="curpass"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          type="password"
                          label="New Password"
                          name="newpass"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          type="password"
                          label="Confirm Password"
                          name="conpass"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </MDBox>
                      <div className={styles.text}>
                        <a href="/forgotpassword">Forgot password?</a>
                      </div>
                      {message && <p style={{ color: "red" }}>{message}</p>}
                      <MDBox mt={4} mb={1}>
                        <MDButton
                          onClick={handlePassword}
                          variant="gradient"
                          style={{ backgroundColor: "black", color: "white" }}
                          disabled={loading}
                          fullWidth
                        >
                          {loading ? "Updating..." : "Change Password"}
                        </MDButton>
                        <MDButton
                          onClick={handleCancel}
                          variant="gradient"
                          style={{ backgroundColor: "black", color: "white" }}
                          fullWidth
                          disabled={loading}
                          sx={{ marginTop: "1rem" }}
                        >
                          Cancel
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Row>
        </Tab.Container>
      </div>
      <Dialog open={confirmationDialogOpen} onClose={closeConfirmationDialog}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to clear your wishlist?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmationDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmClearWishlist} color="primary">
            Clear
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </div>
  );
}

export default Wishlist;
