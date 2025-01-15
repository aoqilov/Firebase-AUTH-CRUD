import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaUserPlus } from "react-icons/fa";
import { auth } from "../../utils/firebase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Sign = () => {
  const [openEye, setOpenEye] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      if (response) {
        localStorage.setItem("username", formData.name);
        toast.success("Sign saved");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered.");
      } else if (err.code === "auth/weak-password") {
        toast.error("Password must be at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Invalid email format.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  }
  function handleChangeInput(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow  w-100" style={{ maxWidth: "500px" }}>
        {/* title icon*/}
        <div className="text-center mb-4">
          <div
            className="rounded-circle bg-primary d-flex align-items-center justify-content-center mx-auto"
            style={{ width: "50px", height: "50px" }}
          >
            <i className="bi bi-lock-fill text-white fs-4">
              <FaUserPlus />
            </i>
          </div>
        </div>
        {/* title text */}
        <h3 className="text-center mb-4">Sign up</h3>
        {/* form */}
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={(e) => handleChangeInput(e)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={(e) => handleChangeInput(e)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3 ">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="box-input d-flex">
              <input
                type={openEye ? "text" : "password"}
                className="form-control"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => handleChangeInput(e)}
                required
              />
              <span
                onClick={() => setOpenEye(!openEye)}
                className="d-flex justify-content-center align-items-center input-border"
                style={{ width: "10%" }}
              >
                {openEye ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
        {/* form have acount ? */}
        <div className="text-center mt-3">
          <small>
            Already have an account?
            <a href="/login" className="text-primary m-2">
              Login
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Sign;
