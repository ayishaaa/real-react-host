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
import { styled } from "@mui/material/styles";
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

function Tag() {
  // const projectCards = getData();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [image, setImage] = useState("");
  const [tagName, setTagName] = useState("");
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
      const response = await axios.get("http://localhost:8000/admin/listtag");
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

  const handleTagNameChange = (e) => {
    setTagName(e.target.value);
  };

  const handleAddTag = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const base64Image = reader.result;

      var formData = {
        Image: base64Image,
        Name: tagName,
      };
      console.log(formData);
      axios
        .post("http://localhost:8000/admin/addtag", formData)
        .then((response) => {
          console.log(response);

          window.location.href = "/tag";
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

  const handleEditTag = (e) => {
    e.preventDefault();

    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = async () => {
        const base64Image = reader.result;

        var formData = {
          Image: base64Image,
          Name: tagName,
        };
        axios
          .put(`http://localhost:8000/admin/edittag/${selectedProduct._id}`, formData)
          .then((response) => {
            console.log(response);
            fetchData(); // Fetch updated data after successful edit
            window.location.href = "/tag";
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
        Name: tagName,
      };
      axios
        .put(`http://localhost:8000/admin/edittag/${selectedProduct._id}`, formData)
        .then((response) => {
          console.log(response);
          fetchData(); // Fetch updated data after successful edit
          window.location.href = "/tag";
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

  const editTag = (id) => {
    const selectedProduct = List.find((item) => item._id === id);
    setSelectedProduct(selectedProduct);
    setTagName(selectedProduct.Name);
    setImagePreview(selectedProduct.Image);
    setIsEditing(true);
    handleOpen1();
  };

  const deleteTag = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/admin/removetag/${id}`);
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
          bgColor="dark"
          borderRadius="lg"
          // coloredShadow="primary"
          style={{ display: "flex", backgroundColor: "#3c4219", justifyContent: "space-between" }}
        >
          <MDTypography variant="h6" color="white">
            Tag Management
          </MDTypography>
          <MDButton
            variant="gradient"
            style={{
              // marginLeft: "20px",
              // width: "1180px",
              backgroundColor: "#5c5e61",
              color: "white",
            }}
            onClick={handleOpen}
          >
            Click here to Add Tag
          </MDButton>
        </MDBox>
        <MDBox mt={2} mb={7}></MDBox>
        <Grid container spacing={3}>
          {List.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card style={{ backgroundColor: "#d4cdcd" }}>
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
                <MDBox ml={2} pl={4} alignItems="center">
                  <MDButton
                    style={{
                      marginRight: "25px",
                      backgroundColor: "#5c5e61",
                      color: "white",
                      width: "80px",
                    }}
                    onClick={() => editTag(item._id)}
                  >
                    Edit
                  </MDButton>
                  <MDButton
                    style={{ backgroundColor: "#2e2f30", color: "white", width: "80px" }}
                    variant="gradient"
                    onClick={() => deleteTag(item._id)}
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
        <DialogTitle style={{ backgroundColor: "#bd1515", color: "white" }}>Add Tag</DialogTitle>
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
            label="Tag Name"
            fullWidth
            value={tagName}
            onChange={handleTagNameChange}
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
          <Button onClick={handleClose} style={{ backgroundColor: "#bd1515", color: "white" }}>
            Cancel
          </Button>
          <Button onClick={handleAddTag} style={{ backgroundColor: "#bd1515", color: "white" }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle style={{ backgroundColor: "#bd1515", color: "white" }}>Edit Tag</DialogTitle>
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
            label="Tag Name"
            fullWidth
            value={tagName}
            onChange={handleTagNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} style={{ backgroundColor: "#bd1515", color: "white" }}>
            Cancel
          </Button>
          <Button onClick={handleEditTag} style={{ backgroundColor: "#bd1515", color: "white" }}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Tag;
