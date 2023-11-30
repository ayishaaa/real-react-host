import Footer from "./userFrontEnd/footer";
import TopNavBar from "./userFrontEnd/topNavBar";
import styles from "../css/style.module.css";
import blogbg from "../assets/img/breadcrumb-bg.jpg";
import calendar from "../assets/img/icon/calendar.png";
import blog1 from "../assets/img/blog/blog-1.jpg";
import blog2 from "../assets/img/blog/blog-2.jpg";
import blog3 from "../assets/img/blog/blog-3.jpg";
import blog4 from "../assets/img/blog/blog-4.jpg";
import blog5 from "../assets/img/blog/blog-5.jpg";
import blog6 from "../assets/img/blog/blog-6.jpg";
import blog7 from "../assets/img/blog/blog-7.jpg";
import blog8 from "../assets/img/blog/blog-8.jpg";
import blog9 from "../assets/img/blog/blog-9.jpg";

function Blog() {
  return (
    <div>
      <TopNavBar />
      {/* Header Section End */}
      {/* Breadcrumb Section Begin */}
      <section
        className={`${styles.breadcrumbblog} ${styles.setbg}`}
        style={{ backgroundImage: `url(${blogbg})` }}
      >
        <div className={styles.container}>
          <div className="row">
            <div className="col-lg-12">
              <h2>Our Blog</h2>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      {/* Blog Section Begin */}
      <section className={`${styles.blog} ${styles.spad}`}>
        <div className={styles.container}>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className={styles.blog__item}>
                <div
                  className={`${styles.blog__item__pic} ${styles.setbg}`}
                  style={{ backgroundImage: `url(${blog1})` }}
                />
                <div className={styles.blog__item__text}>
                  <span>
                    <img src={calendar} alt />
                    16 February 2020
                  </span>
                  <h5>What Curling Irons Are The Best Ones</h5>
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className={styles.blog__item}>
                <div
                  className={`${styles.blog__item__pic} ${styles.setbg}`}
                  style={{ backgroundImage: `url(${blog2})` }}
                />
                <div className={styles.blog__item__text}>
                  <span>
                    <img src={calendar} alt />
                    21 February 2020
                  </span>
                  <h5>Eternity Bands Do Last Forever</h5>
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className={styles.blog__item}>
                <div
                  className={`${styles.blog__item__pic} ${styles.setbg}`}
                  style={{ backgroundImage: `url(${blog3})` }}
                />
                <div className={styles.blog__item__text}>
                  <span>
                    <img src={calendar} alt />
                    28 February 2020
                  </span>
                  <h5>The Health Benefits Of Sunglasses</h5>
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className={styles.blog__item}>
                <div
                  className={`${styles.blog__item__pic} ${styles.setbg}`}
                  style={{ backgroundImage: `url(${blog4})` }}
                />
                <div className={styles.blog__item__text}>
                  <span>
                    <img src={calendar} alt />
                    16 February 2020
                  </span>
                  <h5>Aiming For Higher The Mastopexy</h5>
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className={styles.blog__item}>
                <div
                  className={`${styles.blog__item__pic} ${styles.setbg}`}
                  style={{ backgroundImage: `url(${blog5})` }}
                />
                <div className={styles.blog__item__text}>
                  <span>
                    <img src={calendar} alt />
                    21 February 2020
                  </span>
                  <h5>Wedding Rings A Gift For A Lifetime</h5>
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className={styles.blog__item}>
                <div
                  className={`${styles.blog__item__pic} ${styles.setbg}`}
                  style={{ backgroundImage: `url(${blog6})` }}
                />
                <div className={styles.blog__item__text}>
                  <span>
                    <img src={calendar} alt />
                    28 February 2020
                  </span>
                  <h5>The Different Methods Of Hair Removal</h5>
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className={styles.blog__item}>
                <div
                  className={`${styles.blog__item__pic} ${styles.setbg}`}
                  style={{ backgroundImage: `url(${blog7})` }}
                />
                <div className={styles.blog__item__text}>
                  <span>
                    <img src={calendar} alt />
                    16 February 2020
                  </span>
                  <h5>Hoop Earrings A Style From History</h5>
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className={styles.blog__item}>
                <div
                  className={`${styles.blog__item__pic} ${styles.setbg}`}
                  style={{ backgroundImage: `url(${blog8})` }}
                />
                <div className={styles.blog__item__text}>
                  <span>
                    <img src={calendar} alt />
                    21 February 2020
                  </span>
                  <h5>Lasik Eye Surgery Are You Ready</h5>
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className={styles.blog__item}>
                <div
                  className={`${styles.blog__item__pic} ${styles.setbg}`}
                  style={{ backgroundImage: `url(${blog9})` }}
                />
                <div className={styles.blog__item__text}>
                  <span>
                    <img src={calendar} alt />
                    28 February 2020
                  </span>
                  <h5>Lasik Eye Surgery Are You Ready</h5>
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Blog;
