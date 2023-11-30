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

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get("http://localhost:8000/admin/listadmin");
      setList(response.data);
    } catch (error) {
      console.error(error);
      if (error.response.status == "401") {
        window.location.href = "/authentication/sign-in";
      }
    }
  };

  const editAdmin = (id) => {
    const selectedAdmin = List.find((item) => item._id === id);
    const queryParams = new URLSearchParams();
    queryParams.append("id", id);
    queryParams.append("name", selectedAdmin.name);
    queryParams.append("username", selectedAdmin.username);
    queryParams.append("password", selectedAdmin.password);
    queryParams.append("email", selectedAdmin.email);
    queryParams.append("country", selectedAdmin.country);
    queryParams.append("state", selectedAdmin.state);
    queryParams.append("phone", selectedAdmin.phone);
    queryParams.append("role", selectedAdmin.role);
    queryParams.append("image", selectedAdmin.image);
    navigate(`/editadmin?${queryParams.toString()}`);
  };

  const deleteAdmin = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/admin/removeadmin/${id}`);
      setList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const Admin = ({ image, name, username, role }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDBox style={{ display: "flex", flexDirection: "row" }}>
          <MDTypography
            display="block"
            variant="button"
            style={{ color: "#505934" }}
            fontWeight="medium"
          >
            {name}
          </MDTypography>
        </MDBox>
        <MDTypography variant="caption" style={{ color: "#505934" }}>
          {username}
        </MDTypography>
        <br />
        <MDTypography variant="caption" style={{ color: "#505934" }}>
          {role}
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
      name: <Admin image={item.image} name={item.name} username={item.username} role={item.role} />,
      email: <Email email={item.email} phone={item.phone} />,
      place: <Place state={item.state} country={item.country} />,
      edit: (
        <MDBox ml={-1}>
          <MDButton
            style={{ backgroundColor: "#7ca603", color: "white" }}
            variant="gradient"
            onClick={() => editAdmin(item._id)}
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
            onClick={() => deleteAdmin(item._id)}
          >
            Remove
          </MDButton>
        </MDBox>
      ),
    })),
  };
}
