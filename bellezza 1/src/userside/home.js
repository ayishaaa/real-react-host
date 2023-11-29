import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import styles from "../css/style.module.css";
import { Image, Row } from "react-bootstrap";
import search from "assets/img/icon/search.png";
import heart from "assets/img/icon/heart.png";
import cart from "assets/img/icon/cart.png";
import calendar from "assets/img/icon/calendar.png";
import productsale from "assets/img/product-sale.png";
import instagram1 from "assets/img/instagram/instagram-1.jpg";
import instagram2 from "assets/img/instagram/instagram-2.jpg";
import instagram3 from "assets/img/instagram/instagram-3.jpg";
import instagram4 from "assets/img/instagram/instagram-4.jpg";
import instagram5 from "assets/img/instagram/instagram-5.jpg";
import instagram6 from "assets/img/instagram/instagram-6.jpg";
import blog1 from "assets/img/blog/blog-1.jpg";
import blog2 from "assets/img/blog/blog-2.jpg";
import blog3 from "assets/img/blog/blog-3.jpg";
import TopNavBar from "./userFrontEnd/topNavBar";
import Footer from "./userFrontEnd/footer";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [List, setList] = useState([]);
  const [banner, setBanner] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("");
  const navigate = useNavigate();
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    fetchData();
    fetchProduct();
  }, []);

  const shuffledLists = shuffleArray(List);
  const randomProduct = shuffledLists.slice(0, 20);

  const relatedClo = randomProduct.filter((product) => product.tag === "Clothings");
  const relatedCloToDisplay = relatedClo.slice(0, 1);

  const relatedAcc = randomProduct.filter(
    (product) => product.tag === "Accessories" || product.tag === "Jewellery"
  );
  const relatedAccToDisplay = relatedAcc.slice(0, 1);

  const relatedFoo = randomProduct.filter((product) => product.tag === "Footwear");
  const relatedFooToDisplay = relatedFoo.slice(0, 1);

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

  const shuffledList = shuffleArray(List);
  const randomProducts = shuffledList.slice(0, 8);
  const handleFilterClick = (filter) => {
    setCurrentFilter(filter);
  };

  const filteredProducts = currentFilter === "best-sellers" ? randomProducts : List.slice(0, 8);

  const fetchData = async () => {
    console.log(0);
    try {
      const response = await axios.get("http://localhost:8000/users/listbanner");
      setBanner(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchProduct = async () => {
    axios
      .get("http://localhost:8000/users/listproduct")
      .then((response) => {
        console.log("Response data:", response.data);
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddToWishlist = (product) => {
    const wishItem = {
      id: product._id,
      productName: product.productname,
      price: product.price,
      offerprice: product.offerprice,
      image: `http://localhost:8000/uploads/${product.images[0]}`,
      quantity: 1, // You can set a default quantity
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
        <TopNavBar />
        <section className={styles.hero}>
          <OwlCarousel
            className={`${styles.hero__slider} ${styles.owlcarousel}`}
            items={1}
            loop
            nav
            autoplay
          >
            {banner.map((item, index) => (
              <div
                className={`${styles.hero__items} ${styles.setbg}`}
                key={index}
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className={styles.container} style={{ marginLeft: "230px" }}>
                  <div className="col-xl-5 col-lg-7 col-md-8">
                    <div className={styles.hero__text}>
                      <h6>{item.name}</h6>
                      <h2>{item.subname}</h2>
                      <p>{item.description}</p>
                      <a href="/shop" className={styles.primarybtn}>
                        Shop now
                        <span className={styles.arrow_right} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </section>
        <section className={`${styles.banner} ${styles.spad}`}>
          <div className={styles.container}>
            <Row>
              {relatedCloToDisplay.map((item, index) => (
                <div className="col-lg-7 offset-lg-4" key={index}>
                  <div className={styles.banner__item}>
                    <div
                      className={styles.banner__item__pic}
                      onClick={() => handleProductClick(item._id)}
                    >
                      <Image
                        src={`http://localhost:8000/uploads/${item.images[0]}`}
                        alt="clothing-banner"
                        style={{ height: "490px", width: "430px" }}
                      />
                    </div>
                    <div className={styles.banner__item__text}>
                      <h2>Clothing Collections 2030</h2>
                      <a href="/shop">Shop now</a>
                    </div>
                  </div>
                </div>
              ))}
              {relatedAccToDisplay.map((item, index) => (
                <div className="col-lg-5" key={index}>
                  <div className={`${styles.banner__item} ${styles.banner__item_middle}`}>
                    <div
                      className={styles.banner__item__pic}
                      onClick={() => handleProductClick(item._id)}
                    >
                      <Image
                        style={{ height: "388px", width: "438px" }}
                        src={`http://localhost:8000/uploads/${item.images[0]}`}
                        alt="accessories-banner"
                      />
                    </div>
                    <div className={styles.banner__item__text}>
                      <h2>Accessories</h2>
                      <a href="/shop">Shop now</a>
                    </div>
                  </div>
                </div>
              ))}
              {relatedFooToDisplay.map((item, index) => (
                <div className="col-lg-7" key={index}>
                  <div className={`${styles.banner__item} ${styles.banner__item_last}`}>
                    <div
                      className={styles.banner__item__pic}
                      onClick={() => handleProductClick(item._id)}
                    >
                      <Image
                        style={{ height: "380px", width: "380px" }}
                        src={`http://localhost:8000/uploads/${item.images[0]}`}
                        alt="footwear-banner"
                      />
                    </div>
                    <div className={styles.banner__item__text}>
                      <h2>Shoes Spring 2030</h2>
                      <a href="/shop">Shop now</a>
                    </div>
                  </div>
                </div>
              ))}
            </Row>
          </div>
        </section>
        <section className={`${styles.product} ${styles.spad}`}>
          <div className={styles.container}>
            <Row>
              <div className="col-lg-12">
                <ul className={styles.filter__controls}>
                  <li
                    className={currentFilter === "best-sellers" ? "active" : ""}
                    onClick={() => handleFilterClick("best-sellers")}
                  >
                    Best Sellers
                  </li>
                  <li
                    className={currentFilter === "new-arrivals" ? "active" : ""}
                    onClick={() => handleFilterClick("new-arrivals")}
                  >
                    New Arrivals
                  </li>
                  <li data-filter=".hot-sales">Hot Sales</li>
                </ul>
              </div>
            </Row>
            <Row className={`${styles.product__filter}`}>
              {filteredProducts.map((item, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals"
                  key={index}
                >
                  <div
                    className={`${styles.product__item} ${styles.sale}`}
                    onClick={() => handleProductClick(item._id)}
                  >
                    <div
                      className={`${styles.product__item__pic} ${styles.setbg}`}
                      style={{
                        backgroundImage: `url(http://localhost:8000/uploads/${item.images[0]})`,
                        height: "250px",
                        width: "180px",
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
                            <span>Cart</span>
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
                      <div className={styles.rating}>
                        <i className="fa fa-star-o" />
                        <i className="fa fa-star-o" />
                        <i className="fa fa-star-o" />
                        <i className="fa fa-star-o" />
                        <i className="fa fa-star-o" />
                      </div>
                      <h5>Offer price: ₹{item.offerprice}</h5>
                      <h6>₹{item.price}</h6>
                      <div className={styles.product__color__select}>
                        <label htmlFor="pc-1">
                          <input type="radio" id="pc-1" />
                        </label>
                        <label className={`${styles.active} ${styles.black}`} htmlFor="pc-2">
                          <input type="radio" id="pc-2" />
                        </label>
                        <label className={styles.grey} htmlFor="pc-3">
                          <input type="radio" id="pc-3" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Row>
          </div>
        </section>
        <section className={`${styles.categories} ${styles.spad}`}>
          <div className={styles.container}>
            <Row>
              <div className="col-lg-3">
                <div className={styles.categories__text}>
                  <h2>
                    Clothings Hot <br /> <span>Shoe Collection</span> <br /> Accessories
                  </h2>
                </div>
              </div>
              <div className="col-lg-4">
                <div className={styles.categories__hot__deal}>
                  <Image src={productsale} alt="" />
                  <div className={styles.hot__deal__sticker}>
                    <span>Sale Of</span>
                    <h5>$29.99</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 offset-lg-1">
                <div className={styles.categories__deal__countdown}>
                  <span>Deal Of The Week</span>
                  <h2>Multi-pocket Chest Bag Black</h2>
                  <div className={styles.categories__deal__countdown__timer} id="countdown">
                    <div className={styles.cditem}>
                      <span>3</span>
                      <p>Days</p>
                    </div>
                    <div className={styles.cditem}>
                      <span>1</span>
                      <p>Hours</p>
                    </div>
                    <div className={styles.cditem}>
                      <span>50</span>
                      <p>Minutes</p>
                    </div>
                    <div className={styles.cditem}>
                      <span>18</span>
                      <p>Seconds</p>
                    </div>
                  </div>
                  <a href="#" className={styles.primarybtn}>
                    Shop now
                  </a>
                </div>
              </div>
            </Row>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Home;
