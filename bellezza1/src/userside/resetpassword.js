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

function Reset() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const data = JSON.parse(localStorage.getItem("email"));
  const email = data.email;

  const handleSave = async (e) => {
    e.preventDefault();

    if (newPassword === "" || confirmPassword === "") {
      setError1("Please fill the fields");
    } else {
      const data = {
        newpass: newPassword,
        conpass: confirmPassword,
        email: email,
      };
      axios
        .post("http://localhost:8000/users/resetpassword", data)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data, email);
            console.log(response.data.success);
            localStorage.removeItem("email");
            window.location.href = "/user/registration";
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            setError1(error.response.data.message);
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
                        type="text"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className={regstyles.inputbox}>
                      <i className="fas fa-user" />
                      <input
                        type="text"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    {error1 && <p style={{ color: "red" }}>{error1}</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div className={`${regstyles.button} ${regstyles.inputbox}`}>
                      <input type="submit" onClick={handleSave} defaultValue="Sumbit" />
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

export default Reset;
