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
import { useNavigate } from "react-router-dom";

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
import { useState } from "react";
import axios from "axios";

function Adduser() {
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/users");
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const base64Image = reader.result;

      var formData = {
        firstName: firstname,
        lastName: lastname,
        Username: username,
        Password: password,
        Email: email,
        Country: country,
        State: state,
        Phone: phone,
        Image: base64Image,
      };
      console.log(formData);
      axios
        .post("http://localhost:8000/admin/adduser", formData)
        .then((response) => {
          console.log(response);

          window.location.href = "/users";
        })
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.status === 400) {
            setError(error.response.data.error);
          }
        });
    };
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
            ADD USER
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter users email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="First Name"
                value={firstname}
                onChange={(e) => setfirstName(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Last Name"
                value={lastname}
                onChange={(e) => setlastName(e.target.value)}
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
                fullWidth
              >
                Add User
              </MDButton>
              <br />
              <br />
              <MDButton
                onClick={handleClose}
                style={{ backgroundColor: "#708238", color: "white" }}
                fullWidth
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

export default Adduser;
