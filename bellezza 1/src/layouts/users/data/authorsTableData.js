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
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import MDButton from "components/MDButton";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function data() {
  const [List, setList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  //   axios
  //     .get("http://localhost:8000/admin/listuser")
  //     .then((response) => {
  //       setList(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get("http://localhost:8000/admin/listuser");
      setList(response.data);
    } catch (error) {
      console.error(error);
      if (error.response.status == "401") {
        window.location.href = "/authentication/sign-in";
      }
    }
  };

  const editProduct = (id) => {
    const selectedProduct = List.find((item) => item._id === id);
    const queryParams = new URLSearchParams();
    queryParams.append("id", id);
    queryParams.append("firstname", selectedProduct.firstname);
    queryParams.append("lastname", selectedProduct.lastname);
    queryParams.append("username", selectedProduct.username);
    queryParams.append("password", selectedProduct.password);
    queryParams.append("email", selectedProduct.email);
    queryParams.append("country", selectedProduct.country);
    queryParams.append("state", selectedProduct.state);
    queryParams.append("phone", selectedProduct.phone);
    queryParams.append("image", selectedProduct.image);
    navigate(`/edituser?${queryParams.toString()}`);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/admin/remove/${id}`);
      setList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const User = ({ image, firstname, lastname, username }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={firstname} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDBox style={{ display: "flex", flexDirection: "row" }}>
          <MDTypography
            display="block"
            variant="button"
            style={{ color: "#505934" }}
            fontWeight="medium"
          >
            {firstname} {lastname}
          </MDTypography>
        </MDBox>
        <MDTypography variant="caption" style={{ color: "#505934" }}>
          {username}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Email = ({ email, phone }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        style={{ color: "#505934" }}
        fontWeight="medium"
      >
        {email}
      </MDTypography>
      <MDTypography variant="caption" style={{ color: "#505934" }}>
        {phone}
      </MDTypography>
    </MDBox>
  );

  const Place = ({ state, country }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        variant="caption"
        display="block"
        style={{ color: "#505934" }}
        fontWeight="medium"
      >
        {state}
      </MDTypography>
      <MDTypography variant="caption" style={{ color: "#505934" }}>
        {country}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "name", accessor: "name", width: "35%", align: "left" },
      { Header: "contact details", accessor: "email", align: "left" },
      { Header: "place", accessor: "place", align: "left" },
      { Header: "edit", accessor: "edit", align: "center" },
      { Header: "remove", accessor: "remove", align: "center" },
    ],
    rows: List.map((item) => ({
      name: (
        <User
          image={item.image}
          firstname={item.firstname}
          lastname={item.lastname}
          username={item.username}
        />
      ),
      email: <Email email={item.email} phone={item.phone} />,
      place: <Place state={item.state} country={item.country} />,
      edit: (
        <MDBox ml={-1}>
          <MDButton
            style={{ backgroundColor: "#7ca603", color: "white" }}
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
            style={{ backgroundColor: "#31381d", color: "white" }}
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
