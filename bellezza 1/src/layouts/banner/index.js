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

function Banner() {
  // const projectCards = getData();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [image, setImage] = useState("");
  const [bannerName, setBannerName] = useState("");
  const [subName, setSubName] = useState("");
  const [description, setDescription] = useState("");
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
      //axios.defaults.headers.post["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
      const response = await axios.get("http://localhost:8000/admin/listbanner");
      setList(response.data);
    } catch (error) {
      if (error.response.status == "401") {
        window.location.href = "authentication/sign-in";
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

  const handleAddBanner = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const base64Image = reader.result;

      var formData = {
        Image: base64Image,
        Name: bannerName,
        Subname: subName,
        Description: description,
      };
      console.log(formData);
      axios
        .post("http://localhost:8000/admin/addbanner", formData)
        .then((response) => {
          console.log(response);

          window.location.href = "/banner";
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

  const handleEditBanner = (e) => {
    e.preventDefault();

    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = async () => {
        const base64Image = reader.result;

        var formData = {
          Image: base64Image,
          Name: bannerName,
          Subname: subName,
          Description: description,
        };
        axios
          .put(`http://localhost:8000/admin/editbanner/${selectedProduct._id}`, formData)
          .then((response) => {
            console.log(response);
            fetchData(); // Fetch updated data after successful edit
            window.location.href = "/banner";
          })
          .catch((error) => {
            console.error(error);
            if (error.response && error.response.status === 400) {
              setError(error.response.data.error);
            }
          });
      };
    } else {
      var formData = {
        Image: selectedProduct.Image,
        Name: bannerName,
        Subname: subName,
        Description: description,
      };
      axios
        .put(`http://localhost:8000/admin/editbanner/${selectedProduct._id}`, formData)
        .then((response) => {
          console.log(response);
          fetchData();
          window.location.href = "/banner";
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

  const editBanner = (id) => {
    const selectedProduct = List.find((item) => item._id === id);
    setSelectedProduct(selectedProduct);
    setBannerName(selectedProduct.name);
    setImagePreview(selectedProduct.image);
    setSubName(selectedProduct.subname);
    setDescription(selectedProduct.description);
    setIsEditing(true);
    handleOpen1();
  };

  const deleteBanner = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/admin/removebanner/${id}`);
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
          coloredShadow="primary"
          style={{ display: "flex", backgroundColor: "#3c4219", justifyContent: "space-between" }}
        >
          <MDTypography variant="h6" color="white">
            Banner Management
          </MDTypography>
          <MDButton
            variant="gradient"
            style={{
              // marginLeft: "20px",
              // width: "1180px",
              backgroundColor: "#bd1515",
              color: "white",
            }}
            onClick={handleOpen}
          >
            Click here to Add Banner
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
                </CardContent>
                <MDBox ml={2} pl={4} alignItems="center">
                  <MDButton
                    style={{
                      marginRight: "25px",
                      backgroundColor: "#bd0b0b",
                      color: "white",
                      width: "80px",
                    }}
                    onClick={() => editBanner(item._id)}
                  >
                    Edit
                  </MDButton>
                  <MDButton
                    style={{ backgroundColor: "#590404", color: "white", width: "80px" }}
                    variant="gradient"
                    onClick={() => deleteBanner(item._id)}
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
        <DialogTitle style={{ backgroundColor: "#bd1515", color: "white" }}>Add Banner</DialogTitle>
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
            label="Heading"
            fullWidth
            value={bannerName}
            onChange={(e) => setBannerName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Sub heading"
            fullWidth
            value={subName}
            onChange={(e) => setSubName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          <Button onClick={handleAddBanner} style={{ backgroundColor: "#bd1515", color: "white" }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle style={{ backgroundColor: "#bd1515", color: "white" }}>
          Edit Banner
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
            label="Heading"
            fullWidth
            value={bannerName}
            onChange={(e) => setBannerName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Sub heading"
            fullWidth
            value={subName}
            onChange={(e) => setSubName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} style={{ backgroundColor: "#bd1515", color: "white" }}>
            Cancel
          </Button>
          <Button onClick={handleEditBanner} style={{ backgroundColor: "#bd1515", color: "white" }}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Banner;
