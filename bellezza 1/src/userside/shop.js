import React from "react";
import styles from "../css/style.module.css";
import search from "assets/img/icon/search.png";
import heart from "assets/img/icon/heart.png";
import cart from "assets/img/icon/cart.png";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TopNavBar from "./userFrontEnd/topNavBar";
import Footer from "./userFrontEnd/footer";
import { MenuItem, Select } from "@mui/material";

function Shop() {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tagList, setTagList] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [brandList, setBrandList] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [materialList, setMaterialList] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState(""); // New state for selected price range
  const [List, setList] = useState([]);
  const [Lists, setLists] = useState([]);
  const navigate = useNavigate("");
  const [sortBy, setSortBy] = useState("sortByPrice");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12); // Number of products per page
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const productsPerPage = 12;
  // const totalPages = Math.ceil(List.length / productsPerPage); // Calculate the total number of pages
  // const startIndex = (currentPage - 1) * pageSize;
  // const endIndex = Math.min(startIndex + pageSize, totalProducts);
  console.log(totalPages);
  console.log(totalProducts);
  console.log(sortBy);

  const handleProductClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/users/detailproduct/${id}`);
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
      navigate(`/shopdetails`, { state });
    } catch (error) {
      console.error(error);
    }
  };
  // &pricerange=${selectedPriceRange.min}-${selectedPriceRange.max}
  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/users/pageproduct?page=${currentPage}&pageSize=${pageSize}&category=${selectedCategory}&tag=${selectedTag}&brand=${selectedBrand}&material=${selectedMaterial}&pricerange=${selectedPriceRange.min}-${selectedPriceRange.max}&sortBy=${sortBy}`
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
  }, [
    currentPage,
    pageSize,
    selectedCategory,
    selectedTag,
    selectedBrand,
    selectedMaterial,
    selectedPriceRange,
    sortBy,
  ]);

  useEffect(() => {
    sortProducts(sortBy);
  }, [sortBy]);

  const sortProducts = (sortOption) => {
    const sortedList = [...Lists];
    if (sortOption === "lowToHigh") {
      sortedList.sort((a, b) => a.offerprice - b.offerprice);
    } else if (sortOption === "highToLow") {
      sortedList.sort((a, b) => b.offerprice - a.offerprice);
    }
    setLists(sortedList);
  };

  const handlePriceRangeClick = (priceRange) => {
    const priceRangeFilter = priceRange === "" ? "" : { min: priceRange.min, max: priceRange.max };
    setSelectedPriceRange(priceRangeFilter);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
    setSelectedPriceRange("");
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag === selectedTag ? "" : tag);
    setSelectedPriceRange("");
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand === selectedBrand ? "" : brand);
    setSelectedPriceRange("");
  };

  const handleMaterialClick = (material) => {
    setSelectedMaterial(material === selectedMaterial ? "" : material);
    setSelectedPriceRange("");
  };

  const searchProducts = (list, query) => {
    return list.filter((item) => {
      const productName = item.productname || "";
      const category = item.category || "";
      const tag = item.tag || "";
      const brand = item.brand || "";
      const material = item.material || "";
      const offerprice = item.offerprice || "";

      return (
        productName.toLowerCase().includes(query.toLowerCase()) ||
        category.toLowerCase().includes(query.toLowerCase()) ||
        tag.toLowerCase().includes(query.toLowerCase()) ||
        brand.toLowerCase().includes(query.toLowerCase()) ||
        material.toLowerCase().includes(query.toLowerCase()) ||
        String(offerprice).includes(query)
      );
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    setSelectedCategory("");
    setSelectedTag("");
    setSelectedBrand("");
    setSelectedMaterial("");
    setSelectedPriceRange("");
  };

  const filteredList =
    searchQuery ||
    selectedCategory ||
    selectedTag ||
    selectedBrand ||
    selectedMaterial ||
    (selectedPriceRange && selectedPriceRange.min && selectedPriceRange.max)
      ? searchProducts(Lists, searchQuery).filter((item) => {
          return (
            (!selectedCategory || item.category === selectedCategory) &&
            (!selectedTag || item.tag === selectedTag) &&
            (!selectedBrand || item.brand === selectedBrand) &&
            (!selectedMaterial || item.material === selectedMaterial) &&
            (!selectedPriceRange ||
              (selectedPriceRange.min <= item.offerprice &&
                item.offerprice <= selectedPriceRange.max))
          );
        })
      : Lists;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalProducts);
  const productsToRender = filteredList.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productListResponse = await axios.get(`http://localhost:8000/users/listproduct`);
        setLists(productListResponse.data);

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

  const handleAddToWishlist = (product) => {
    const wishItem = {
      id: product._id,
      productName: product.productname,
      price: product.price,
      offerprice: product.offerprice,
      image: `http://localhost:8000/uploads/${product.images[0]}`,
      quantity: 1,
    };
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isProductInWishlist = existingWishlist.some((item) => item._id === wishItem.id);
    if (!isProductInWishlist) {
      existingWishlist.push(wishItem);
      localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
      // setIsAddedToWish(true);
      console.log("Product added to wish!");
    } else {
      // setIsAddedToWish(false);
      console.log("Product is already in the wish.");
    }
  };

  const handleAddToCartItem = (product) => {
    console.log("Product being added to cart:", product);
    const cartItem = {
      id: product._id,
      productName: product.productname,
      price: product.price,
      offerprice: product.offerprice,
      image: `http://localhost:8000/uploads/${product.images[0]}`,
      quantity: 1,
    };
    console.log(cartItem);
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductInCart = existingCart.some((item) => item.id === cartItem.id);
    if (!isProductInCart) {
      existingCart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(existingCart));
      console.log("Product added to cart!");
    } else {
      console.log("Product is already in the cart.");
    }
  };

  return (
    <>
      <div>
        <div className={styles.offcanvasmenuoverlay} />
        <TopNavBar />
        <section className={styles.breadcrumboption}>
          <div className={styles.container}>
            <Row className={styles.row}>
              <div className="col-lg-6">
                <div className={styles.breadcrumb__text}>
                  <h4>Shop</h4>
                  <br />
                  <div className={styles.breadcrumb__links}>
                    <Link to="/home">Home</Link>
                    <span>Shop</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className={styles.shop__product__option__right}>
                  {selectedCategory && (
                    <span style={{ fontSize: "15px" }}>Selected Category: {selectedCategory}</span>
                  )}
                  <br />
                  {selectedTag && (
                    <span style={{ fontSize: "15px" }}>Selected Tag: {selectedTag}</span>
                  )}
                  <br />
                  {selectedBrand && (
                    <span style={{ fontSize: "15px" }}>Selected Brand: {selectedBrand}</span>
                  )}
                  <br />
                  {selectedMaterial && (
                    <span style={{ fontSize: "15px" }}>Selected Material: {selectedMaterial}</span>
                  )}
                  <br />
                  {selectedPriceRange && (
                    <span style={{ fontSize: "15px" }}>
                      Selected Price Range: {selectedPriceRange.min} - {selectedPriceRange.max}
                    </span>
                  )}
                </div>
              </div>
            </Row>
          </div>
        </section>
        <section className={`${styles.shop} ${styles.spad}`}>
          <div className={styles.container}>
            <Row className={styles.row}>
              <div className="col-lg-3">
                <div className={styles.shop__sidebar}>
                  <div className={styles.shop__sidebar__search}>
                    <form action="#">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                      <button type="button" onClick={handleSearchClick}>
                        <span className={styles.icon_search} />
                      </button>
                    </form>
                  </div>
                  <div className={styles.shop__sidebar__accordion}>
                    <div className={styles.accordion} id="accordionExample">
                      <div className={styles.card}>
                        <div className={styles.cardheading}>
                          <a data-toggle="collapse" data-target="#collapseOne">
                            Categories
                          </a>
                        </div>
                        <div
                          id="collapseOne"
                          className="collapse show"
                          data-parent="#accordionExample"
                        >
                          <div className={styles.cardbody}>
                            <div
                              className={`${styles.shop__sidebar__categories} ${styles.scrollableContainer}`}
                            >
                              <ul>
                                <li>
                                  <a href="#" onClick={() => handleCategoryClick("")}>
                                    All
                                  </a>
                                </li>
                                {categoryList.map((categoryItem) => (
                                  <li key={categoryItem._id}>
                                    <a
                                      href="#"
                                      className={
                                        selectedCategory === categoryItem.name
                                          ? styles.active
                                          : undefined
                                      }
                                      onClick={() => handleCategoryClick(categoryItem.name)}
                                    >
                                      {categoryItem.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.card}>
                        <div className={styles.cardheading}>
                          <a data-toggle="collapse" data-target="#collapseTwo">
                            Tags
                          </a>
                        </div>
                        <div
                          id="collapseTwo"
                          className="collapse show"
                          data-parent="#accordionExample"
                        >
                          <div className={styles.cardbody}>
                            <div
                              className={`${styles.shop__sidebar__tags} ${styles.scrollableContainer}`}
                            >
                              <ul>
                                <li>
                                  <a
                                    href="#"
                                    onClick={() => handleTagClick("")} // Set the selected category to "all" to show all products
                                  >
                                    All
                                  </a>
                                </li>
                                {tagList.map((tagItem) => (
                                  <li key={tagItem._id}>
                                    <a
                                      href="#"
                                      className={
                                        selectedTag === tagItem.name ? styles.active : undefined
                                      }
                                      onClick={() => handleTagClick(tagItem.name)}
                                    >
                                      {tagItem.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.card}>
                        <div className={styles.cardheading}>
                          <a data-toggle="collapse" data-target="#collapseTwo">
                            Branding
                          </a>
                        </div>
                        <div
                          id="collapseTwo"
                          className="collapse show"
                          data-parent="#accordionExample"
                        >
                          <div className={styles.cardbody}>
                            <div
                              className={`${styles.shop__sidebar__brand} ${styles.scrollableContainer}`}
                            >
                              <ul>
                                <li>
                                  <a
                                    href="#"
                                    onClick={() => handleBrandClick("")} // Set the selected category to "all" to show all products
                                  >
                                    All
                                  </a>
                                </li>
                                {brandList.map((brandItem) => (
                                  <li key={brandItem._id}>
                                    <a
                                      href="#"
                                      className={
                                        selectedBrand === brandItem.name ? styles.active : undefined
                                      }
                                      onClick={() => handleBrandClick(brandItem.name)}
                                    >
                                      {brandItem.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.card}>
                        <div className={styles.cardheading}>
                          <a data-toggle="collapse" data-target="#collapseTwo">
                            Material
                          </a>
                        </div>
                        <div
                          id="collapseTwo"
                          className="collapse show"
                          data-parent="#accordionExample"
                        >
                          <div className={styles.cardbody}>
                            <div
                              className={`${styles.shop__sidebar__brand} ${styles.scrollableContainer}`}
                            >
                              <PerfectScrollbar>
                                <ul>
                                  <li>
                                    <a
                                      href="#"
                                      onClick={() => handleMaterialClick("")} // Set the selected category to "all" to show all products
                                    >
                                      All
                                    </a>
                                  </li>
                                  {materialList.map((materialItem) => (
                                    <li key={materialItem._id}>
                                      <a
                                        href="#"
                                        className={
                                          selectedMaterial === materialItem.name
                                            ? styles.active
                                            : undefined
                                        }
                                        onClick={() => handleMaterialClick(materialItem.name)}
                                      >
                                        {materialItem.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </PerfectScrollbar>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.card}>
                        <div className={styles.cardheading}>
                          <a data-toggle="collapse" data-target="#collapseThree">
                            Filter Price
                          </a>
                        </div>
                        <div
                          id="collapseThree"
                          className="collapse show"
                          data-parent="#accordionExample"
                        >
                          <div className={styles.cardbody}>
                            <div className={styles.shop__sidebar__price}>
                              <ul>
                                <li>
                                  <a href="#" onClick={() => handlePriceRangeClick("")}>
                                    All
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    onClick={() => handlePriceRangeClick({ min: 150, max: 300 })}
                                  >
                                    ₹150.00 - ₹300.00
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    onClick={() => handlePriceRangeClick({ min: 301, max: 800 })}
                                  >
                                    ₹301.00 - ₹800.00
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    onClick={() => handlePriceRangeClick({ min: 801, max: 1200 })}
                                  >
                                    ₹801.00 - ₹1200.00
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    onClick={() => handlePriceRangeClick({ min: 1201, max: 2000 })}
                                  >
                                    ₹1201.00 - ₹2000.00
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    onClick={() => handlePriceRangeClick({ min: 2000, max: 10000 })}
                                  >
                                    ₹2000.00 - ₹10000.00
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    onClick={() =>
                                      handlePriceRangeClick({ min: 10000, max: Infinity })
                                    }
                                  >
                                    ₹10000.00+
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className={styles.shop__product__option}>
                  <Row className={styles.row}>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className={styles.shop__product__option__left}>
                        <p>
                          Showing {startIndex + 1}-{startIndex + productsToRender.length} of
                          {filteredList.length} results
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div
                        className={`${styles.shop__product__option__right} ${styles.customselect}`}
                      >
                        <p>Sort by Price:</p>
                        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                          <MenuItem value="sortByPrice" disabled>
                            Sort by Price
                          </MenuItem>
                          <MenuItem value="lowToHigh">Low To High</MenuItem>
                          <MenuItem value="highToLow">High To Low</MenuItem>
                        </Select>
                      </div>
                    </div>
                  </Row>
                </div>
                <Row className={styles.row}>
                  {List.map((item, index) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals"
                      key={index}
                      // onClick={() => handleProductClick(item._id)}
                      style={{
                        height: "450px",
                        width: "220px",
                      }}
                    >
                      <div
                        className={`${styles.product__item} ${styles.sale}`}
                        onClick={() => handleProductClick(item._id)}
                      >
                        <div
                          className={`${styles.product__item__pic} ${styles.setbg}`}
                          style={{
                            backgroundImage: `url(http://localhost:8000/uploads/${item.images[0]})`,
                          }}
                        >
                          <ul className={styles.product__hover}>
                            <li>
                              <a onClick={() => handleAddToWishlist(item)} href="#">
                                <Image src={heart} alt="heart" />
                              </a>
                            </li>
                            <li>
                              <a onClick={() => handleAddToCartItem(item)} href="#">
                                <Image src={cart} alt="cart" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <Image src={search} alt="search" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className={styles.product__item__text}>
                          <h6>{item.productname}</h6>
                          <a href="#" className="add-cart">
                            {item.productname}
                          </a>
                          <h5>Offer price: ₹{item.offerprice}</h5>
                          <h6>₹{item.price}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </Row>
                <Row className={styles.row}>
                  <div className="col-lg-12">
                    <div className={styles.product__pagination}>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <a
                          key={page}
                          className={page === currentPage ? styles.active : undefined}
                          onClick={() => setCurrentPage(page)}
                          href="#"
                        >
                          {page}
                          <br />
                        </a>
                      ))}
                    </div>
                  </div>
                </Row>
              </div>
            </Row>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Shop;
