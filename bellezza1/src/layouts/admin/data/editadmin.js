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

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/wallpaper/img1.jpg";
import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Editadmin() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const id = searchParams.get("id");

  useEffect(() => {
    const name = searchParams.get("name");
    const username = searchParams.get("username");
    const password = searchParams.get("password");
    const email = searchParams.get("email");
    const country = searchParams.get("country");
    const state = searchParams.get("state");
    const phone = searchParams.get("phone");
    const role = searchParams.get("role");
    const image = searchParams.get("image");

    if (name) setName(name);
    if (username) setUsername(username);
    if (password) setPassword(password);
    if (email) setEmail(email);
    if (country) setCountry(country);
    if (state) setState(state);
    if (phone) setPhone(phone);
    if (role) setRole(role);
    if (image) {
      setImage(image);
      setImagePreview(image);
    }
  }, [searchParams]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onloadend = async () => {
      var base64Image = reader.result;
      setImagePreview(base64Image);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var base64Image = imagePreview;
    console.log(image);
    if (image != "") {
    }
    if (
      !name ||
      !username ||
      !password ||
      !email ||
      !country ||
      !state ||
      !phone ||
      !role ||
      !image
    ) {
      // Handle validation error, show error message, or prevent form submission
      return;
    }

    setLoading(true);
    var formData = {
      Name: name,
      Username: username,
      Password: password,
      Email: email,
      Country: country,
      State: state,
      Phone: phone,
      Role: role,
      Image: base64Image,
    };
    console.log(formData);
    try {
      const response = axios.post(`http://localhost:8000/admin/editadmin/${id}`, formData);
      console.log(response);
      navigate("/admins");
    } catch (error) {
      console.error(error);
      // Handle error or show error message
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admins");
  };

  return (
    <BasicLayout mx={2} mt={-3} image={bgImage}>
      <Card style={{ marginTop: "150px", marginBottom: "90px", backgroundColor: "#e2edc2" }}>
        <MDBox
          variant="gradient"
          style={{ backgroundColor: "#708238" }}
          borderRadius="lg"
          coloredShadow="success"
          mx={3}
          mt={-8}
          p={3}
          mb={-1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            EDIT ADMIN
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Edit the details
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="number"
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
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
            {imagePreview && (
              <MDBox mb={2}>
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
                style={{ backgroundColor: "#708238", color: "white" }}
                disabled={loading}
                fullWidth
              >
                {loading ? "Updating..." : "Edit Product"}
              </MDButton>
              <MDButton
                onClick={handleCancel}
                variant="gradient"
                style={{ backgroundColor: "#708238", color: "white" }}
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
    </BasicLayout>
  );
}

export default Editadmin;
