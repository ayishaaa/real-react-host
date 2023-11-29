import regstyles from "../css/reg.module.css";
import img1 from "../assets/images/wallpaper/img4.jpg";
import img2 from "../assets/images/wallpaper/img2.jpg";
import { useState } from "react";
import { Row } from "react-bootstrap";
import { Icon } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import TopNavBar from "./userFrontEnd/topNavBar";
import Footer from "./userFrontEnd/footer";

function Forgot() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");

  const sendSubmit = (event) => {
    event.preventDefault();
    console.log({ username });

    if (username === "") {
      setError1("Enter username");
    } else {
      var UserLogin = { Username: username };
      axios
        .post("http://localhost:8000/users/forgotpassword", UserLogin)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("email", JSON.stringify(response.data.email));
            console.log("hello", response.data.email);
            window.location.href = "/verifyotp";
          }
        })
        .catch((error) => {
          setError1("Invalid Username");
          if (error.response && error.response.status === 400) {
            setError(error.response.data.error);
          }
        });
    }
  };

  return (
    <div>
      <TopNavBar />
      <div className={regstyles.body}>
        <div className={regstyles.container}>
          <input type="checkbox" id="flip" className={regstyles.flip} />
          <div className={regstyles.cover}>
            <div className={regstyles.front}>
              <img src={img1} alt="front" />
              <div className={regstyles.text}>
                <span className={regstyles.text1}>
                  Every new friend is a
                  <br />
                  new adventure
                </span>
                <span className={regstyles.text2}>Lets get connected</span>
              </div>
            </div>
          </div>
          <div className={regstyles.forms}>
            <div className={regstyles.formcontent}>
              <div className={regstyles.loginform}>
                <div className={regstyles.title}>Forgot Password</div>
                <form action="#">
                  <div className={regstyles.inputboxes}>
                    <div className={regstyles.inputbox}>
                      <i className="fas fa-user" />
                      <input
                        type="username"
                        placeholder="Enter your Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    {error1 && <p style={{ color: "red" }}>{error1}</p>}
                    <div className={`${regstyles.button} ${regstyles.inputbox}`}>
                      <input type="submit" onClick={sendSubmit} defaultValue="Send" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Forgot;
