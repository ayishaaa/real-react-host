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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import bgImage from "assets/images/bg-profile.jpeg";
// Data
import authorsTableData from "layouts/product/data/authorsTableData";
import MDButton from "components/MDButton";

import { Link, useNavigate } from "react-router-dom";
import { InputLabel, MenuItem, Select, TableBody, TableHead, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Placeholder, Row } from "react-bootstrap";
import styles from "css/style.module.css";
import { Label } from "@mui/icons-material";

function Product() {
  const [List, setList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tagList, setTagList] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [brandList, setBrandList] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [materialList, setMaterialList] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   axios.defaults.headers.common["Authorization"] = token;
  //   axios
  //     .get("http://localhost:8000/admin/listproduct")
  //     .then((response) => {
  //       console.log("Response data:", response.data);
  //       setList(response.data);
  //     })
  //     .catch((error) => {
  //       if (error.response.status == "401") {
  //         window.location.href = "/authentication/sign-in";
  //       }
  //     });
  // }, []);

  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
    setCurrentPage(1); // Reset currentPage to 1 when pageSize changes
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productListResponse = await axios.get(`http://localhost:8000/users/listproduct`);
        setList(productListResponse.data);

        const [categoryResponse, tagResponse, brandResponse, materialResponse] = await Promise.all([
          axios.get("http://localhost:8000/users/listcategory"),
          axios.get("http://localhost:8000/users/listtag"),
          axios.get("http://localhost:8000/users/listbrand"),
          axios.get("http://localhost:8000/users/listmaterial"),
        ]);

        setCategoryList(categoryResponse.data);
        setTagList(tagResponse.data);
        setBrandList(brandResponse.data);
        setMaterialList(materialResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/users/pageproduct?page=${currentPage}&pageSize=${pageSize}&category=${selectedCategory}&tag=${selectedTag}&brand=${selectedBrand}&material=${selectedMaterial}`
      )
      .then((response) => {
        console.log("Response data:", response.data.products);
        setList(response.data.products);
        console.log("list", response.data.products);
        setTotalPages(response.data.totalPages);
        setTotalProducts(response.data.totalProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage, pageSize, selectedCategory, selectedTag, selectedBrand, selectedMaterial]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
    // setSelectedPriceRange("");
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag === selectedTag ? "" : tag);
    // setSelectedPriceRange("");
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand === selectedBrand ? "" : brand);
    // setSelectedPriceRange("");
  };

  const handleMaterialClick = (material) => {
    setSelectedMaterial(material === selectedMaterial ? "" : material);
    // setSelectedPriceRange("");
  };

  const editProduct = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/admin/detailproduct/${id}`);
      const selectedProduct = response.data;
      const state = {
        id,
        productName: selectedProduct.productName,
        price: selectedProduct.price,
        offerprice: selectedProduct.offerprice,
        description: selectedProduct.description,
        category: selectedProduct.category,
        tag: selectedProduct.tag,
        brand: selectedProduct.brand,
        material: selectedProduct.material,
        image: selectedProduct.images,
      };
      console.log(state);
      navigate(`/editproduct`, { state });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/admin/removeproduct/${id}`);
      setList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout image={bgImage}>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox
          mx={2}
          mt={-3}
          py={3}
          px={2}
          borderRadius="lg"
          coloredShadow="info"
          style={{ display: "flex", backgroundColor: "#1f2e38", justifyContent: "space-between" }}
        >
          <MDTypography variant="h6" color="white">
            Product Management
          </MDTypography>
          <Link to="/addproduct" style={{ textDecoration: "none" }}>
            <MDButton
              style={{
                backgroundColor: "#253845",
                color: "white",
              }}
              fullWidth
            >
              Click here to Add Product
            </MDButton>
          </Link>
        </MDBox>
        <MDBox mt={2} mb={7}></MDBox>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                borderRadius="lg"
                coloredShadow="info"
                style={{ backgroundColor: "#365163" }}
              >
                <MDTypography variant="h6" color="white">
                  Product List
                </MDTypography>
              </MDBox>
              <MDBox mx={2} display="flex" justifyContent="space-between" pt={5}>
                <label htmlFor="category">Category:</label>
                <Select
                  fullWidth
                  value={selectedCategory}
                  onChange={(event) => handleCategoryClick(event.target.value)}
                >
                  <MenuItem value="" disabled>
                    Select a category
                  </MenuItem>
                  <MenuItem onClick={() => handleCategoryClick("")}>All</MenuItem>
                  {categoryList.map((categoryItem) => (
                    <MenuItem
                      key={categoryItem._id}
                      className={selectedCategory === categoryItem.name ? styles.active : undefined}
                      onClick={() => handleCategoryClick(categoryItem.name)}
                      value={categoryItem.name}
                    >
                      {categoryItem.name}
                    </MenuItem>
                  ))}
                </Select>
                <label htmlFor="tag">Tag:</label>
                <Select
                  fullWidth
                  value={selectedTag}
                  onChange={(event) => handleTagClick(event.target.value)}
                >
                  <MenuItem value="" disabled>
                    Select a tag
                  </MenuItem>
                  <MenuItem onClick={() => handleTagClick("")}>All</MenuItem>
                  {tagList.map((tagItem) => (
                    <MenuItem
                      key={tagItem._id}
                      className={selectedTag === tagItem.name ? styles.active : undefined}
                      onClick={() => handleTagClick(tagItem.name)}
                      value={tagItem.name}
                    >
                      {tagItem.name}
                    </MenuItem>
                  ))}
                </Select>
                <label htmlFor="brand">Brand:</label>
                <Select
                  fullWidth
                  value={selectedBrand}
                  onChange={(event) => handleBrandClick(event.target.value)}
                >
                  <MenuItem value="" disabled>
                    Select a brand
                  </MenuItem>
                  <MenuItem onClick={() => handleBrandClick("")}>All</MenuItem>
                  {brandList.map((brandItem) => (
                    <MenuItem
                      key={brandItem._id}
                      className={selectedBrand === brandItem.name ? styles.active : undefined}
                      onClick={() => handleBrandClick(brandItem.name)}
                      value={brandItem.name}
                    >
                      {brandItem.name}
                    </MenuItem>
                  ))}
                </Select>
                <label htmlFor="material">Material:</label>
                <Select
                  fullWidth
                  value={selectedMaterial}
                  onChange={(event) => handleMaterialClick(event.target.value)}
                >
                  <MenuItem value="" disabled>
                    Select a material
                  </MenuItem>
                  <MenuItem onClick={() => handleMaterialClick("")}>All</MenuItem>
                  {materialList.map((materialItem) => (
                    <MenuItem
                      key={materialItem._id}
                      className={selectedMaterial === materialItem.name ? styles.active : undefined}
                      onClick={() => handleMaterialClick(materialItem.name)}
                      value={materialItem.name}
                    >
                      {materialItem.name}
                    </MenuItem>
                  ))}
                </Select>
                <label htmlFor="material">Page size:</label>
                <Select fullWidth value={pageSize} onChange={handlePageSizeChange}>
                  <MenuItem value="items" disabled>
                    Enter your page size
                  </MenuItem>
                  <MenuItem value="10">10</MenuItem>
                  <MenuItem value="20">20</MenuItem>
                  <MenuItem value="30">30</MenuItem>
                  <MenuItem value="40">40</MenuItem>
                  <MenuItem value="50">50</MenuItem>
                  <MenuItem value="100">100</MenuItem>
                </Select>
              </MDBox>
              <MDBox pt={8}>
                <div className="DataTable">
                  <table>
                    <TableHead>
                      <TableBody>
                        <tr style={{ display: "flex", justifyContent: "space-between" }}>
                          <th style={{ paddingLeft: "5%" }}>Product</th>
                          <th style={{ paddingLeft: "20%" }}>Name</th>
                          <th style={{ paddingLeft: "30%" }}>Price</th>
                          <th style={{ paddingLeft: "70%" }}>Description</th>
                          <th style={{ paddingLeft: "80%" }}>Edit</th>
                          <th style={{ paddingLeft: "10%" }}>Remove</th>
                        </tr>
                      </TableBody>
                    </TableHead>
                    <TableHead>
                      <TableBody>
                        {List.map((item) => (
                          <div key={item._id} style={{ paddingTop: "5px" }}>
                            <tr>
                              <td style={{ width: "100px" }}>
                                <img
                                  src={`http://localhost:8000/uploads/${item.images[0]}`}
                                  style={{ height: "150px", width: "100px" }}
                                />
                              </td>
                              <td style={{ paddingLeft: "2%", width: "180px" }}>
                                {item.productname}
                              </td>
                              <td style={{ paddingLeft: "2%", width: "100px" }}>
                                <h5 style={{ textDecoration: "line-through" }}>₹ {item.price}</h5>
                                <h5 style={{ fontWeight: "medium" }}>₹ {item.offerprice}</h5>
                              </td>
                              <td
                                style={{ paddingLeft: "2%", width: "580px", textAlign: "center" }}
                              >
                                {item.description}
                              </td>
                              <td style={{ paddingLeft: "2%" }}>
                                <MDBox ml={-1}>
                                  <MDButton
                                    className="edit-btn"
                                    variant="gradient"
                                    onClick={() => editProduct(item._id)}
                                    style={{
                                      backgroundColor: "#365163",
                                      color: "white",
                                      width: "80px",
                                    }}
                                  >
                                    Edit
                                  </MDButton>
                                </MDBox>
                              </td>
                              <td style={{ paddingLeft: "2%" }}>
                                <MDBox ml={3}>
                                  <MDButton
                                    className="remove-btn"
                                    variant="gradient"
                                    onClick={() => deleteProduct(item._id)}
                                    style={{
                                      backgroundColor: "#253845",
                                      color: "white",
                                      width: "80px",
                                    }}
                                  >
                                    Remove
                                  </MDButton>
                                </MDBox>
                              </td>
                            </tr>
                          </div>
                        ))}
                      </TableBody>
                    </TableHead>
                  </table>
                </div>
              </MDBox>
            </Card>
            <Row className={styles.row}>
              <div className="col-lg-12">
                <div className={styles.product__paginations}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <a
                      key={page}
                      className={page === currentPage ? styles.active : undefined}
                      onClick={() => setCurrentPage(page)}
                      href="#"
                      style={{
                        display:
                          page >= currentPage - 2 && page <= currentPage + 2 && page <= 4
                            ? "inline"
                            : page >= currentPage - 2 &&
                              page <= currentPage + 2 &&
                              page >= totalPages - 4
                            ? "inline"
                            : page >= currentPage - 2 &&
                              page <= currentPage + 2 &&
                              page > 4 &&
                              page < totalPages - 4
                            ? "inline"
                            : "none",
                      }}
                    >
                      {page}
                      <br />
                    </a>
                  ))}
                  {currentPage >= 4 && currentPage < totalPages - 4 ? (
                    <a key="next" onClick={() => setCurrentPage(currentPage + 1)} href="#">
                      Next
                    </a>
                  ) : null}
                </div>
              </div>
            </Row>
          </Grid>
        </Grid>
        <br />
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Product;
