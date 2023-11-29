import Footer from "./userFrontEnd/footer";
import TopNavBar from "./userFrontEnd/topNavBar";
import styles from "../css/style.module.css";
import about from "../assets/img/about/about-us.jpg";
import about1 from "../assets/img/about/testimonial-author.jpg";
import about2 from "../assets/img/about/testimonial-pic.jpg";
import team1 from "../assets/img/about/team-1.jpg";
import team2 from "../assets/img/about/team-2.jpg";
import team3 from "../assets/img/about/team-3.jpg";
import team4 from "../assets/img/about/team-4.jpg";
import client1 from "../assets/img/clients/client-1.png";
import client2 from "../assets/img/clients/client-2.png";
import client3 from "../assets/img/clients/client-3.png";
import client4 from "../assets/img/clients/client-4.png";
import client5 from "../assets/img/clients/client-5.png";
import client6 from "../assets/img/clients/client-6.png";
import client7 from "../assets/img/clients/client-7.png";
import client8 from "../assets/img/clients/client-8.png";

function About() {
  return (
    <div>
      {/* <div id="preloder">
        <div className="loader" />
      </div> */}
      <TopNavBar />
      <section className={styles.breadcrumboption}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className="col-lg-12">
              <div className={styles.breadcrumb__text}>
                <h4>About Us</h4>
                <div className={styles.breadcrumb__links}>
                  <a href="/home">Home</a>
                  <span>About Us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.about} ${styles.spad}`}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className="col-lg-12">
              <div className={styles.about__pic}>
                <img src={about} alt />
              </div>
            </div>
          </div>
          <div className="row d-flex justify">
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className={styles.about__item}>
                <h4>Who We Are ?</h4>
                <p>
                  Contextual advertising programs sometimes have strict policies that need to be
                  adhered too. Let’s take Google as an example.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className={styles.about__item}>
                <h4>Who We Do ?</h4>
                <p>
                  In this digital generation where information can be easily obtained within
                  seconds, business cards still have retained their importance.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className={styles.about__item}>
                <h4>Why Choose Us</h4>
                <p>
                  A two or three storey house is the ideal way to maximise the piece of earth on
                  which our home sits, but for older or infirm people.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.testimonial}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 p-0">
              <div className={styles.testimonial__text}>
                <span className={styles.icon_quotations} />
                <p>
                  “Going out after work? Take your butane curling iron with you to the office, heat
                  it up, style your hair before you leave the office and you won’t have to make a
                  trip back home.”
                </p>
                <div className={styles.testimonial__author}>
                  <div className={styles.testimonial__author__pic}>
                    <img src={about1} alt />
                  </div>
                  <div className={styles.testimonial__author__text}>
                    <h5>Augusta Schultz</h5>
                    <p>Fashion Design</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 p-0">
              <div
                className={`${styles.testimonial__pic} ${styles.setbg}`}
                style={{ backgroundImage: `url(${about2})` }}
              />
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.counter} ${styles.spad}`}>
        <div className={styles.container}>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className={styles.counter__item}>
                <div className={styles.counter__item__number}>
                  <h2 className={styles.cn_num}>102</h2>
                </div>
                <span>
                  Our <br />
                  Clients
                </span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className={styles.counter__item}>
                <div className={styles.counter__item__number}>
                  <h2 className={styles.cn_num}>30</h2>
                </div>
                <span>
                  Total <br />
                  Categories
                </span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className={styles.counter__item}>
                <div className={styles.counter__item__number}>
                  <h2 className={styles.cn_num}>102</h2>
                </div>
                <span>
                  In <br />
                  Country
                </span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className={styles.counter__item}>
                <div className={styles.counter__item__number}>
                  <h2 className={styles.cn_num}>98</h2>
                  <strong>%</strong>
                </div>
                <span>
                  Happy <br />
                  Customer
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.team} ${styles.spad}`}>
        <div className={styles.container}>
          <div className="row">
            <div className="col-lg-12">
              <div className={styles.sectiontitle}>
                <span>Our Team</span>
                <h2>Meet Our Team</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className={styles.team__item}>
                <img src={team1} alt />
                <h4>John Smith</h4>
                <span>Fashion Design</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className={styles.team__item}>
                <img src={team2} alt />
                <h4>Christine Wise</h4>
                <span>C.E.O</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className={styles.team__item}>
                <img src={team3} alt />
                <h4>Sean Robbins</h4>
                <span>Manager</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className={styles.team__item}>
                <img src={team4} alt />
                <h4>Lucy Myers</h4>
                <span>Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.clients} ${styles.spad}`}>
        <div className={styles.container}>
          <div className="row">
            <div className="col-lg-12">
              <div className={styles.sectiontitle}>
                <span>Partner</span>
                <h2>Happy Clients</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className={styles.client__item}>
                <img src={client1} alt />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className={styles.client__item}>
                <img src={client2} alt />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className={styles.client__item}>
                <img src={client3} alt />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className={styles.client__item}>
                <img src={client4} alt />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className={styles.client__item}>
                <img src={client5} alt />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className={styles.client__item}>
                <img src={client6} alt />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className={styles.client__item}>
                <img src={client7} alt />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className={styles.client__item}>
                <img src={client8} alt />
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default About;
