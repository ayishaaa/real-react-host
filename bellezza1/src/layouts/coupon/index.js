/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import bgImage from "assets/images/bg-profile.jpeg";
// Data
// import authorsTableData from "layouts/coupon/data/authorsTableData";
import MDButton from "components/MDButton";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import image from "assets/images/logos/coupon.png";
import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";
// import { useNavigate } from "react-router-dom";

function Coupon() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [List, setList] = useState([]);
  const [couponName, setCouponName] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const navigate = useNavigate();
  // const { columns, rows } = authorsTableData();

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get("http://localhost:8000/admin/listcoupon");
      setList(response.data);
    } catch (error) {
      if (error.response.status == "401") {
        window.location.href = "/authentication/sign-in";
      }
    }
  };

  const handleAddCoupon = (e) => {
    e.preventDefault();

    var formData = {
      Name: couponName,
      Code: code,
      Discount: discount,
    };
    console.log(formData);
    axios
      .post("http://localhost:8000/admin/addcoupon", formData)
      .then((response) => {
        console.log(response);

        window.location.href = "/coupon";
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 400) {
          setError(error.response.data.error);
        }
      });
    handleClose();
  };
  const handleEditCoupon = (e) => {
    e.preventDefault();

    var formData = {
      Name: couponName,
      Code: code,
      Discount: discount,
    };
    axios
      .put(`http://localhost:8000/admin/editcoupon/${selectedProduct._id}`, formData)
      .then((response) => {
        console.log(response);
        fetchData(); // Fetch updated data after successful edit
        window.location.href = "/coupon";
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 400) {
          setError(error.response.data.error);
        }
      });
    handleClose1();
  };

  const editCoupon = (id) => {
    const selectedProduct = List.find((item) => item._id === id);
    setSelectedProduct(selectedProduct);
    setCouponName(selectedProduct.name);
    setCode(selectedProduct.code);
    setDiscount(selectedProduct.discount);
    setIsEditing(true);
    handleOpen1();
  };

  const deleteCoupon = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/admin/removecoupon/${id}`);
      setList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout image={bgImage}>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox
          mx={2}
          mt={-3}
          py={3}
          px={2}
          borderRadius="lg"
          coloredShadow="info"
          style={{ display: "flex", backgroundColor: "#d67211", justifyContent: "space-between" }}
        >
          <MDTypography variant="h6" color="white">
            Coupon Management
          </MDTypography>
          {/* <Link to="/addusers" style={{ textDecoration: "none" }}> */}
          <MDButton
            // variant="gradient"
            // color="info"
            style={{
              // marginLeft: "20px",
              // width: "1180px",
              backgroundColor: "#d18438",
              color: "white",
            }}
            onClick={handleOpen}
          >
            Click here to Add Coupon
          </MDButton>
          {/* </Link> */}
        </MDBox>
        <MDBox mt={2} mb={7}></MDBox>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                borderRadius="lg"
                coloredShadow="info"
                style={{ backgroundColor: "#d1965c" }}
              >
                <MDTypography variant="h6" color="white">
                  Coupon List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <div className="DataTable">
                  <table>
                    <TableHead>
                      <TableBody>
                        <th style={{ width: "750px", textTransform: "uppercase" }}>coupon name</th>
                        <th style={{ width: "550px", textTransform: "uppercase" }}>coupon code</th>
                        <th style={{ width: "550px", textTransform: "uppercase" }}>Discount</th>
                        <th style={{ width: "150px", textTransform: "uppercase" }}>edit</th>
                        <th style={{ width: "150px", textTransform: "uppercase" }}>remove</th>
                      </TableBody>
                    </TableHead>
                    <TableHead>
                      {List.map((item) => (
                        <TableBody key={item._id} style={{ height: "70px" }}>
                          <td style={{ width: "180px" }}>
                            <img src={image} style={{ height: "60px" }} />
                          </td>
                          <td style={{ width: "750px", marginLeft: "500px" }}>{item.name}</td>
                          <td style={{ width: "550px" }}>{item.code}</td>
                          <td style={{ width: "550px" }}>{item.discount}</td>
                          <td style={{ width: "150px" }}>
                            <MDBox ml={-1}>
                              <MDButton
                                className="edit-btn"
                                variant="gradient"
                                onClick={() => editCoupon(item._id)}
                                style={{ backgroundColor: "#d18438", color: "white" }}
                              >
                                Edit
                              </MDButton>
                            </MDBox>
                          </td>
                          <td style={{ width: "150px" }}>
                            <MDBox ml={-1}>
                              <MDButton
                                className="remove-btn"
                                variant="gradient"
                                onClick={() => deleteCoupon(item._id)}
                                style={{ backgroundColor: "#824923", color: "white" }}
                              >
                                Remove
                              </MDButton>
                            </MDBox>
                          </td>
                        </TableBody>
                      ))}
                    </TableHead>
                  </table>
                </div>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
        <br />
      </MDBox>
      {/* <Footer /> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ backgroundColor: "#b58850", color: "white" }}>Add Coupon</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Coupon Name"
            fullWidth
            value={couponName}
            onChange={(e) => setCouponName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Coupon Code"
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Discount"
            fullWidth
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ backgroundColor: "#b58850", color: "white" }}>
            Cancel
          </Button>
          <Button onClick={handleAddCoupon} style={{ backgroundColor: "#b58850", color: "white" }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle style={{ backgroundColor: "#b58850", color: "white" }}>
          Edit Coupon
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Coupon Name"
            fullWidth
            value={couponName}
            onChange={(e) => setCouponName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Coupon Code"
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Discount"
            fullWidth
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} style={{ backgroundColor: "#b58850", color: "white" }}>
            Cancel
          </Button>
          <Button onClick={handleEditCoupon} style={{ backgroundColor: "#b58850", color: "white" }}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Coupon;
