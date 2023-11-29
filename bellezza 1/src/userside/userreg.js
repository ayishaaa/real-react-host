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

function Userreg() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [username1, setUsername1] = useState("");
  const [password1, setPassword1] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    const flipCheckbox = document.getElementById("flip");
    flipCheckbox.checked = !isFlipped;
  };
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const SignupSubmit = (e) => {
    e.preventDefault();

    if (
      !firstname ||
      !lastname ||
      !username ||
      !password ||
      !email ||
      !country ||
      !state ||
      !phone ||
      !image
    ) {
      setError2("Please fill in all required fields.");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const base64Image = reader.result;

      var formData = {
        firstName: firstname,
        lastName: lastname,
        Username: username,
        Password: password,
        Email: email,
        Country: country,
        State: state,
        Phone: phone,
        Image: base64Image,
      };
      console.log(formData);
      axios
        .post("http://localhost:8000/users/adduser", formData)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            localStorage.setItem("usertoken", response.data.token);
            console.log("hello");
            window.location.href = "/home";
          }
          // window.location.href = "/home";
        })
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.status === 400) {
            setError(error.response.data.error);
          }
        });
    };
  };

  const loginSubmit = (event) => {
    event.preventDefault();
    console.log({ username1, password1 });

    if (username1 === "" && password1 === "") {
      setError1("Enter username and password");
    } else {
      var UserLogin = { Username: username1, Password: password1 };
      axios
        .post("http://localhost:8000/users/usercollect", UserLogin)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("usertoken", response.data.token);
            console.log(response.data.user);

            localStorage.setItem("userProfile", JSON.stringify(response.data.user));
            console.log("hello");
            window.location.href = "/home";
          }
        })
        .catch((error) => {
          setError1("Invalid ** Username or Password");
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
                <div className={regstyles.title}>Login</div>
                <form action="#">
                  <div className={regstyles.inputboxes}>
                    <div className={regstyles.inputbox}>
                      <i className="fas fa-user" />
                      <input
                        type="username"
                        placeholder="Enter your Username"
                        value={username1}
                        onChange={(e) => setUsername1(e.target.value)}
                        required
                      />
                    </div>
                    <div className={regstyles.inputbox}>
                      <i className="fas fa-lock" />
                      <input
                        type="password"
                        placeholder="Enter your Password"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        required
                      />
                    </div>
                    <div className={regstyles.text}>
                      <a href="/forgotpassword">Forgot password?</a>
                    </div>
                    {error1 && <p style={{ color: "red" }}>{error1}</p>}
                    <div className={`${regstyles.button} ${regstyles.inputbox}`}>
                      <input type="submit" onClick={loginSubmit} defaultValue="Login" />
                    </div>
                    <div className={`${regstyles.text} ${regstyles.signuptext}`}>
                      Dont have an account?
                      <label href="flip" onClick={handleFlip}>
                        Signup now
                      </label>
                      <br />
                      <label>
                        <Link to="/home">Back to Home</Link>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <div className={regstyles.signupform}>
                <div className={regstyles.title}>Signup</div>
                <form action="#">
                  <div className={regstyles.inputboxes}>
                    <div className={regstyles.inputbox}>
                      <i>
                        <Icon>
                          <span className="material-symbols-rounded">dns</span>
                        </Icon>
                      </i>
                      <input
                        type="text"
                        placeholder="First name"
                        value={firstname}
                        onChange={(e) => setfirstName(e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={lastname}
                        onChange={(e) => setlastName(e.target.value)}
                        required
                      />
                    </div>
                    <div className={regstyles.inputbox}>
                      <i className="fas fa-user" />
                      <input
                        type="text"
                        placeholder="Enter a Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className={regstyles.inputbox}>
                      <i className="fas fa-lock" />
                      <input
                        type="password"
                        placeholder="Enter a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className={regstyles.inputbox}>
                      <i className="fas fa-envelope" />
                      <input
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className={regstyles.inputbox}>
                      <i>
                        <Icon>
                          <span className="material-symbols-rounded">flag</span>
                        </Icon>
                      </i>
                      <input
                        type="text"
                        placeholder="Enter your Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                      />
                    </div>
                    <div className={regstyles.inputbox}>
                      <i>
                        <Icon>
                          <span className="material-symbols-rounded">domain</span>
                        </Icon>
                      </i>
                      <input
                        type="text"
                        placeholder="Enter your State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                      />
                    </div>
                    <div className={regstyles.inputbox}>
                      <i>
                        <Icon>
                          <span className="material-symbols-rounded">call</span>
                        </Icon>
                      </i>
                      <input
                        type="number"
                        placeholder="Enter your Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className={regstyles.inputbox}>
                      <i>
                        <Icon>
                          <span className="material-symbols-rounded">add_a_photo</span>
                        </Icon>
                      </i>
                      <input
                        type="file"
                        placeholder="Profile Image"
                        onChange={handleImageChange}
                        required
                      />
                    </div>
                    {error2 && <p style={{ color: "red" }}>{error2}</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div className={`${regstyles.button} ${regstyles.inputbox}`}>
                      <input type="submit" defaultValue="Sign Up" onClick={SignupSubmit} />
                    </div>
                    <div className={`${regstyles.text} ${regstyles.signuptext}`}>
                      Already have an account?
                      <label href="flip" onClick={handleFlip}>
                        Login now
                      </label>
                      <br />
                      <label>
                        <Link to="/home">Back to Home</Link>
                      </label>
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

export default Userreg;
