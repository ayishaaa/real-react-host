import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

function Material() {
  // const projectCards = getData();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [image, setImage] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [List, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // New state variable
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

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
      const response = await axios.get("http://localhost:8000/admin/listmaterial");
      setList(response.data);
    } catch (error) {
      if (error.response.status == "401") {
        window.location.href = "/authentication/sign-in";
      }
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleImageChange1 = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleMaterialNameChange = (e) => {
    setMaterialName(e.target.value);
  };

  const handleAddMaterial = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const base64Image = reader.result;

      var formData = {
        Image: base64Image,
        Name: materialName,
      };
      console.log(formData);
      axios
        .post("http://localhost:8000/admin/addmaterial", formData)
        .then((response) => {
          console.log(response);

          window.location.href = "/material";
        })
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.status === 400) {
            setError(error.response.data.error);
          }
        });
    };
    handleClose();
  };

  const handleEditMaterial = (e) => {
    e.preventDefault();

    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = async () => {
        const base64Image = reader.result;

        var formData = {
          Image: base64Image,
          Name: materialName,
        };
        axios
          .put(`http://localhost:8000/admin/editmaterial/${selectedProduct._id}`, formData)
          .then((response) => {
            console.log(response);
            fetchData(); // Fetch updated data after successful edit
            window.location.href = "/material";
          })
          .catch((error) => {
            console.error(error);
            if (error.response && error.response.status === 400) {
              setError(error.response.data.error);
            }
          });
      };
    } else {
      // Handle the scenario when no new image is selected
      var formData = {
        Image: selectedProduct.Image,
        Name: materialName,
      };
      axios
        .put(`http://localhost:8000/admin/editmaterial/${selectedProduct._id}`, formData)
        .then((response) => {
          console.log(response);
          fetchData(); // Fetch updated data after successful edit
          window.location.href = "/material";
        })
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.status === 400) {
            setError(error.response.data.error);
          }
        });
    }
    handleClose1();
  };

  const editMaterial = (id) => {
    const selectedProduct = List.find((item) => item._id === id);
    setSelectedProduct(selectedProduct);
    setMaterialName(selectedProduct.Name);
    setImagePreview(selectedProduct.Image);
    setIsEditing(true);
    handleOpen1();
  };

  const deleteMaterial = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/admin/removematerial/${id}`);
      setList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox
          mx={2}
          mt={-3}
          py={3}
          px={2}
          variant="gradient"
          borderRadius="lg"
          coloredShadow="primary"
          style={{ display: "flex", backgroundColor: "#6b3503", justifyContent: "space-between" }}
        >
          <MDTypography variant="h6" color="white">
            Material Management
          </MDTypography>
          <MDButton
            variant="gradient"
            style={{
              // marginLeft: "20px",
              // width: "1180px",
              backgroundColor: "#ab5403",
              color: "white",
            }}
            onClick={handleOpen}
          >
            Click here to Add Material
          </MDButton>
        </MDBox>
        <MDBox mt={2} mb={7}></MDBox>
        <Grid container spacing={3}>
          {List.map((item, index) => (
            <Grid item xs={12} sm={6} md={2} key={index}>
              <Card style={{ backgroundColor: "#fce3bb", height: "350px" }}>
                <CardMedia
                  component="img"
                  height="200px"
                  width="100px"
                  image={item.image}
                  alt={item.name}
                />
                <CardContent>
                  <MDTypography variant="h4" component="div" textAlign="center">
                    {item.name}
                  </MDTypography>
                  {/* <Typography variant="body2" color="text.secondary">
                    {card.props.budget}
                  </Typography> */}
                </CardContent>
                <MDBox ml={0} pl={1} alignItems="center">
                  <MDButton
                    style={{
                      marginRight: "25px",
                      backgroundColor: "#b58850",
                      color: "white",
                      width: "50px",
                    }}
                    onClick={() => editMaterial(item._id)}
                  >
                    Edit
                  </MDButton>
                  <MDButton
                    style={{ backgroundColor: "#523d23", color: "white", width: "80px" }}
                    variant="gradient"
                    onClick={() => deleteMaterial(item._id)}
                  >
                    Remove
                  </MDButton>
                </MDBox>
                <br />
              </Card>
            </Grid>
          ))}
        </Grid>
      </MDBox>
      {/* <Footer /> */}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ backgroundColor: "#b58850", color: "white" }}>
          Add Material
        </DialogTitle>
        <DialogContent>
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
          <TextField
            margin="dense"
            label="Material Name"
            fullWidth
            value={materialName}
            onChange={handleMaterialNameChange}
          />
          {/* <MDBox mb={2}>
            <MDInput
              type="text"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="standard"
              fullWidth
            />
          </MDBox> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ backgroundColor: "#b58850", color: "white" }}>
            Cancel
          </Button>
          <Button
            onClick={handleAddMaterial}
            style={{ backgroundColor: "#b58850", color: "white" }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle style={{ backgroundColor: "#b58850", color: "white" }}>
          Edit Material
        </DialogTitle>
        <DialogContent>
          <MDBox mb={2}>
            <MDInput
              type="file"
              label="Profile Image"
              onChange={handleImageChange1}
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
          <TextField
            margin="dense"
            label="Material Name"
            fullWidth
            value={materialName}
            onChange={handleMaterialNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} style={{ backgroundColor: "#b58850", color: "white" }}>
            Cancel
          </Button>
          <Button
            onClick={handleEditMaterial}
            style={{ backgroundColor: "#b58850", color: "white" }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Material;
