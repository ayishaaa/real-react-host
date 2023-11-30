/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import { Image } from "@mui/icons-material";

// Images
import MDButton from "components/MDButton";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function data() {
  const [List, setList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get("http://localhost:8000/admin/listproduct")
      .then((response) => {
        console.log("Response data:", response.data);
        setList(response.data);
      })
      .catch((error) => {
        if (error.response.status == "401") {
          window.location.href = "/authentication/sign-in";
        }
      });
  }, []);
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8000/admin/listproduct");
  //     setList(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const editProduct = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/admin/detailproduct/${id}`);
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
      navigate(`/editproduct`, { state });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/admin/removeproduct/${id}`);
      setList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const Product = ({ image, productName }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <img src={image} name={productName} style={{ height: "150px", width: "100px" }} />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography
          display="block"
          variant="button"
          style={{ color: "#365163" }}
          fontWeight="medium"
        >
          {productName}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Description = ({ description }) => (
    <MDBox lineHeight={-4} textAlign="left" width="250px">
      <MDTypography variant="caption" style={{ color: "#365163" }}>
        {description}
      </MDTypography>
    </MDBox>
  );

  const Price = ({ price, offerprice }) => (
    <MDBox lineHeight={1} textAlign="left" width="120px">
      <MDTypography
        variant="caption"
        display="block"
        style={{ color: "#365163" }}
        // fontWeight="medium"
      >
        Price : {price}
      </MDTypography>
      <MDTypography
        variant="caption"
        display="block"
        style={{ color: "#365163" }}
        fontWeight="small"
      >
        Offer price : {offerprice}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Product", accessor: "product", width: "20%", align: "left" },
      { Header: "Price", accessor: "price", align: "left" },
      { Header: "Description", accessor: "description", align: "left" },
      { Header: "details", accessor: "details", align: "center", width: "10px" },
      { Header: "edit", accessor: "edit", align: "center", width: "10px" },
      { Header: "remove", accessor: "remove", align: "center", width: "10px" },
    ],
    rows: List.map((item) => ({
      product: (
        <Product
          image={`http://localhost:8000/uploads/${item.images[0]}`}
          productName={item.productname}
        />
      ),
      price: <Price price={item.price} offerprice={item.offerprice} />,
      description: <Description description={item.description} />,
      details: (
        <MDBox ml={-1}>
          <MDButton
            style={{ backgroundColor: "#4c718a", color: "white", align: "center", width: "80px" }}
            variant="gradient"
            // onClick={() => editProduct(item._id)}
          >
            Details
          </MDButton>
        </MDBox>
      ),
      edit: (
        <MDBox ml={-1}>
          <MDButton
            style={{ backgroundColor: "#365163", color: "white", width: "80px" }}
            variant="gradient"
            onClick={() => editProduct(item._id)}
          >
            Edit
          </MDButton>
        </MDBox>
      ),
      remove: (
        <MDBox ml={-1}>
          <MDButton
            style={{ backgroundColor: "#253845", color: "white", width: "80px" }}
            variant="gradient"
            onClick={() => deleteProduct(item._id)}
          >
            Remove
          </MDButton>
        </MDBox>
      ),
    })),
  };
}
