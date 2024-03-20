import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineCheck } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import styles from "./SignUp.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios"; // Import axios for API calls

const UserAuth = ({ auth_mode }) => {
  const [authMode, setAuthMode] = useState(auth_mode); // 1 for login, 2 for signup
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   console.log("formData", formData);
  // }, [formData]);

  const signUpNow = async () => {
    console.log("Sign Up Now");
    const url = `${import.meta.env.VITE_API_URL}/api/v1/signup`; // Adjust the API endpoint

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    const response = await axios
      .post(url, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      .then(function (response) {
        console.log("res", response.data);
        setTimeout(() => {
          dispatch({ type: "LOGIN", payload: response.data.user });
          localStorage.setItem(
            "programminghub",
            JSON.stringify(response.data.user)
          );
          setSignUpSteps(3);
        }, 1200);
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Hmm... 🤔 Signup didn't work. Retry?");
      });
    // Handle success, redirect or show a success message
  };

  const loginNow = async () => {
    console.log("Login Now");
    const url = `${import.meta.env.VITE_API_URL}/api/v1/login`;
    await axios
      .post(url, {
        email: formData.email,
        password: formData.password,
      })
      .then(function (response) {
        toast.success("Authentication Successful");
        console.log("res", response.data);

        setTimeout(() => {
          dispatch({ type: "LOGIN", payload: response.data.user });
          localStorage.setItem(
            "minervauser",
            JSON.stringify(response.data.user)
          );
          navigate("/dashboard");
        }, 1200);
      })
      .catch(function (error) {
        toast.error(error.response.data.message || "Authentication Failed");
        console.log(error);
      });
  };

  return (
    <div
      style={{
        backgroundColor: "transparent",
        position: "relative",
        zIndex: "2",
        display: "flex",
        alignItems: "center",
        height: "100%",
        width: "100%",
        borderEndStartRadius: "16px",
      }}>
      <ToastContainer
        className='customToast'
        position='top-center'
        hideProgressBar
        autoClose={2000}
        closeButton={false}
      />
      <div className={styles.modalContentLeft}>
        <h3>Your success starts here</h3>

        <div className={styles.pointsContainer}>
          <div className={styles.point}>
            <MdOutlineCheck size={18} />
            <span>Over 40 categories</span>
          </div>
          <div className={styles.point}>
            <MdOutlineCheck size={18} />

            <span>Boost your profile at just ₹11</span>
          </div>
          <div className={styles.point}>
            <MdOutlineCheck size={28} />

            <span>Get personal mentor and grow your professional career</span>
          </div>
        </div>
      </div>

      {/* SIGN IN FORM */}

      {authMode === 1 ? (
        <div className={styles.modalContentRight}>
          <h2>Sign in to your account</h2>
          <p>
            Don’t have an account?{" "}
            <span onClick={() => setAuthMode(2)}>Join Here</span>
          </p>
          <div className={styles.formContainer}>
            <div>
              <label>Email</label>
              <input
                type='email'
                placeholder='Example@email.com'
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type='password'
                placeholder='At least 8 characters'
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className={styles.forgotPassword}>
              <Link to='/forgot-password'>Forgot Password?</Link>
            </div>

            <button className={styles.submitBtn} onClick={() => loginNow()}>
              Sign In
            </button>
          </div>
        </div>
      ) : (
        // SIGN UP FORM
        <>
          <div className={styles.modalContentRight}>
            <h2
              style={
                {
                  // marginTop: "-10px",
                }
              }>
              Sign up to get started
            </h2>
            <p>
              Already have an account?{" "}
              <span onClick={() => setAuthMode(1)}>Sign In</span>
            </p>
            <div
              className={styles.formContainer}
              style={{
                marginTop: "30px",
              }}>
              <div>
                <label>Name</label>
                <input
                  type='name'
                  placeholder='Enter your name'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type='email'
                  placeholder='Enter your email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type='password'
                  placeholder='At least 8 characters'
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <button onClick={() => signUpNow()} className={styles.submitBtn}>
                Sign Up
              </button>

              <div className={styles.socialContainer}>
                {/* Google Sign In */}
                <button className={styles.googleBtn}>
                  <FcGoogle size={28} />
                  Sign up with Google
                </button>

                {/* LinkedIn Sign In */}
                <button className={styles.linkedinBtn}>
                  <FaLinkedin size={28} color='#0A66C2' />
                  Sign up with LinkedIn
                </button>
              </div>
            </div>
          </div>
          )
        </>
      )}
    </div>
  );
};

export default UserAuth;
