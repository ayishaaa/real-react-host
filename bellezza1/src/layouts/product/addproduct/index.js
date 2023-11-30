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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/wallpaper/img3.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import FormData from "form-data"; // Import FormData to construct the form data

function Addproduct() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [offerprice, setOfferprice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [brand, setBrand] = useState("");
  const [material, setMaterial] = useState("");
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [materialList, setMaterialList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/listcategory")
      .then((response) => {
        setCategoryList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/listtag")
      .then((response) => {
        setTagList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/listbrand")
      .then((response) => {
        setBrandList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/listmaterial")
      .then((response) => {
        setMaterialList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClose = () => {
    navigate("/product");
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImage(selectedImages);

    const previewImages = [];
    for (let i = 0; i < selectedImages.length; i++) {
      const image = selectedImages[i];
      const imageURL = URL.createObjectURL(image);
      previewImages.push(imageURL);
    }
    setImagePreview(previewImages);
  };
  // const handleImageChange = (e) => {
  //   const selectedFiles = Array.from(e.target.files);
  //   setImage(selectedFiles);

  //   const selectedImagesPreview = selectedFiles.map((file) => URL.createObjectURL(file));
  //   setImagePreview(selectedImagesPreview);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("offerprice", offerprice);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tag", tag);
    formData.append("brand", brand);
    formData.append("material", material);
    for (let i = 0; i < image.length; i++) {
      formData.append("images", image[i]);
    }

    axios
      .post("http://localhost:8000/admin/addproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      // .post("http://localhost:8000/admin/addproduct", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // })
      .then((response) => {
        console.log(response.data);
        window.location.href = "/product";
      })
      .catch((error) => {
        console.error(error);
        // window.location.href = "/addproduct";
      });
  };

  return (
    <BasicLayout mx={2} mt={-3} image={bgImage}>
      <Card
        style={{
          marginTop: "150px",
          marginBottom: "90px",
          backgroundColor: "#d4d7d9",
        }}
      >
        <MDBox
          variant="gradient"
          style={{
            backgroundColor: "#435f7a",
            color: "#d4d7d9",
          }}
          borderRadius="lg"
          mx={3}
          mt={-8}
          p={3}
          mb={-1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            ADD PRODUCT
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter Product Details
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Offer Price"
                value={offerprice}
                onChange={(e) => setOfferprice(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="standard"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2} pt={2}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                variant="standard"
                fullWidth
              >
                <MenuItem value="" disabled>
                  Select a category
                </MenuItem>
                {categoryList.map((categoryItem) => (
                  <MenuItem key={categoryItem._id} value={categoryItem.name}>
                    {categoryItem.name}
                  </MenuItem>
                ))}
              </Select>
            </MDBox>
            <MDBox mb={2} pt={0}>
              <InputLabel id="tag-label">Tag</InputLabel>
              <Select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                variant="standard"
                fullWidth
              >
                <MenuItem value="" disabled>
                  Select a tag
                </MenuItem>
                {tagList.map((tagItem) => (
                  <MenuItem key={tagItem._id} value={tagItem.name}>
                    {tagItem.name}
                  </MenuItem>
                ))}
              </Select>
            </MDBox>
            <MDBox mb={2} pt={0}>
              <InputLabel id="brand-label">Brand</InputLabel>
              <Select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                variant="standard"
                fullWidth
              >
                <MenuItem value="" disabled>
                  Select a brand
                </MenuItem>
                {brandList.map((brandItem) => (
                  <MenuItem key={brandItem._id} value={brandItem.name}>
                    {brandItem.name}
                  </MenuItem>
                ))}
              </Select>
            </MDBox>
            <MDBox mb={2} pt={-2}>
              <InputLabel id="material-label">Material</InputLabel>
              <Select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                variant="standard"
                fullWidth
              >
                <MenuItem value="" disabled>
                  Select a Material
                </MenuItem>
                {materialList.map((materialItem) => (
                  <MenuItem key={materialItem._id} value={materialItem.name}>
                    {materialItem.name}
                  </MenuItem>
                ))}
              </Select>
            </MDBox>
            <MDBox mb={2}>
              <input type="file" accept="image/*" onChange={handleImageChange} multiple />
            </MDBox>
            {imagePreview.map((preview, index) => (
              <MDBox mb={2} key={index}>
                <img
                  src={preview}
                  alt="Image Preview"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </MDBox>
            ))}
            <MDBox mt={4} mb={1}>
              <MDButton
                onClick={handleSubmit}
                variant="gradient"
                style={{ backgroundColor: "#435f7a", color: "white" }}
                fullWidth
              >
                Add Product
              </MDButton>
              <br />
              <br />
              <MDButton
                onClick={handleClose}
                style={{ backgroundColor: "#435f7a", color: "white" }}
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

export default Addproduct;
