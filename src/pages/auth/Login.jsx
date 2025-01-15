import React, { useState } from "react";
import { CgGlass } from "react-icons/cg";
import { FaUserCheck } from "react-icons/fa6";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [openEye, setOpenEye] = useState(false);
  const navigate = useNavigate();

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      if (response) {
        toast.success("Login is successfuly");
        navigate("/");
        localStorage.setItem("username", formData.name);
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

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow  w-100" style={{ maxWidth: "500px" }}>
        {/* title icon*/}
        <div className="text-center mb-4">
          <div
            className="rounded-circle bg-success d-flex align-items-center justify-content-center mx-auto"
            style={{ width: "50px", height: "50px" }}
          >
            <i className="bi bi-lock-fill text-white fs-4">
              <FaUserCheck />
            </i>
          </div>
        </div>
        {/* title text */}
        <h3 className="text-center mb-4">Login</h3>
        {/* form */}
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => handleChangeInput(e)}
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
          <button type="submit" className="btn btn-success w-100">
            Sign Up
          </button>
        </form>
        {/* form have acount ? */}
        <div className="text-center mt-3">
          <small>
            Are you have not account?
            <a href="/sigin" className="text-primary m-2">
              Sigin Up
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
