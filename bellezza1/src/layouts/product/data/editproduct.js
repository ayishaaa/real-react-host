import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/wallpaper/img3.jpg";

function Editproduct() {
  const [id, setId] = useState(""); // Add this state variable to store the id
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

  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (state) {
      const {
        id,
        productName,
        price,
        offerprice,
        description,
        category,
        tag,
        brand,
        material,
        image,
      } = state;

      setId(id); // Set the id in the state variable
      setProductName(productName || "");
      setPrice(price || "");
      setOfferprice(offerprice || "");
      setDescription(description || "");
      setCategory(category || "");
      setTag(tag || "");
      setBrand(brand || "");
      setMaterial(material || "");

      if (image) {
        setImage([image]);

        const previewImages = [];
        for (let i = 0; i < image.length; i++) {
          const imageURL = `http://localhost:8000/uploads/${image[i]}`;
          previewImages.push(imageURL);
        }
        setImagePreview(previewImages);
        // setImage([image]);
        // setImagePreview([`http://localhost:8000/uploads/${image}`]);
      } else {
        setImage([]);
        setImagePreview([]);
      }
    }
  }, [state]);

  console.log(state);
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

    if (image.length > 0) {
      for (let i = 0; i < image.length; i++) {
        formData.append("images", image[i]);
      }
    }

    axios
      .put(`http://localhost:8000/admin/editproduct/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/product");
      })
      .catch((error) => {
        console.error(error);
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
            EDIT PRODUCT
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Edit Product Details
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
                label="Offer price"
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
            <MDBox mb={2}>
              {imagePreview.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt="Image Preview"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              ))}
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                onClick={handleSubmit}
                variant="gradient"
                style={{ backgroundColor: "#435f7a", color: "white" }}
                fullWidth
              >
                Edit Product
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

export default Editproduct;
