import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../utils/firebase";
import { toast } from "sonner";

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  //   FIREBASE
  const fetchUser = async () => {
    try {
      const response = await getDoc(doc(db, "users", id));
      if (response.exists()) {
        setPostData(response.data());
      } else {
        toast.warning("no such document");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [id]);

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
      const result = await updateDoc(doc(db, "users", id), postData);
      toast.success("changed data");
      setPostData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
      navigate("/");
    } catch (error) {
      toast.warning(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Edit User</h1>
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
          EDIT USER
        </button>
      </form>
    </div>
  );
};

export default PostEdit;
