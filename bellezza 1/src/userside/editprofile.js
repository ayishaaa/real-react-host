import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";
import { useParams } from "react-router-dom";

function EditProfile({ userDetails }) {
  const { id } = useParams();
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    const formData = new FormData();
    formData.append("firstName", userDetails.firstName);
    formData.append("lastName", userDetails.lastName);
    formData.append("Username", userDetails.Username);
    formData.append("Country", userDetails.Country);
    formData.append("State", userDetails.State);
    formData.append("Phone", userDetails.Phone);
    formData.append("Email", userDetails.Email);
    formData.append("Image", userDetails.Image);

    try {
      const response = axios.post(
        `http://localhost:8000/users/edituser/${userDetails.id}`,
        formData
      );
      console.log(response);
      navigate("/wishlist");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/wishlist");
  };

  return (
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
  );
}

export default EditProfile;
EditProfile.propTypes = {
  userDetails: PropTypes.object.isRequired, // or the appropriate PropTypes
};
