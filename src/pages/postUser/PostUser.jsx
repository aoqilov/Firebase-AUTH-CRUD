import React, { useState } from "react";
import { db } from "../../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const PostUser = () => {
  // main states
  const [postData, setPostData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  //   functions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // "users" to'plamini olish
      const usersCollection = collection(db, "users");
      // To'plamga yangi hujjat qo'shish
      const result = await addDoc(usersCollection, postData);
      if (result) {
        toast.success("successfuly add data");
        setPostData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        });
        navigate("/");
      }
    } catch (error) {
      toast.warning(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Post User</h1>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
        <div className="mb-3 d-flex justify-content-between gap-3">
          <div className="w-100">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control w-100"
              id="firstName"
              name="firstName"
              value={postData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
            />
          </div>

          <div className=" w-100">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control w-100"
              id="lastName"
              name="lastName"
              value={postData.lastName}
              onChange={handleChange}
              placeholder="Smith"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={postData.email}
            onChange={handleChange}
            placeholder="jane.smith@example.com"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={postData.phone}
            onChange={handleChange}
            placeholder="+123456789"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          POST USER
        </button>
      </form>
    </div>
  );
};

export default PostUser;
