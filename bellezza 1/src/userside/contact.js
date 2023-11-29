import Footer from "./userFrontEnd/footer";
import TopNavBar from "./userFrontEnd/topNavBar";
import styles from "../css/style.module.css";
import blogdetails from "../assets/img/blog/details/blog-details.jpg";
import blogauthor from "../assets/img/blog/details/blog-author.jpg";
// {styles.}
function Contact() {
  return (
    <div>
      <TopNavBar />
      <div className={styles.map}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111551.9926412813!2d-90.27317134641879!3d38.606612219170856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sbd!4v1597926938024!5m2!1sen!2sbd"
          height={500}
          style={{ border: 0 }}
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
        />
      </div>
      <section className={`${styles.contact} ${styles.spad}`}>
        <div className={styles.container}>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className={styles.contact__text}>
                <div className={styles.sectiontitle}>
                  <span>Information</span>
                  <h2>Contact Us</h2>
                  <p>
                    As you might expect of a company that began as a high-end interiors contractor,
                    we pay strict attention.
                  </p>
                </div>
                <ul>
                  <li>
                    <h4>America</h4>
                    <p>
                      195 E Parker Square Dr, Parker, CO 801 <br />
                      +43 982-314-0958
                    </p>
                  </li>
                  <li>
                    <h4>France</h4>
                    <p>
                      109 Avenue Léon, 63 Clermont-Ferrand <br />
                      +12 345-423-9893
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className={styles.contact__form}>
                <form action="#">
                  <div className="row">
                    <div className="col-lg-6">
                      <input type="text" placeholder="Name" />
                    </div>
                    <div className="col-lg-6">
                      <input type="text" placeholder="Email" />
                    </div>
                    <div className="col-lg-12">
                      <textarea placeholder="Message" defaultValue={""} />
                      <button type="submit" className="site-btn">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Contact;
