import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Sign from "./pages/auth/Sign";
import Login from "./pages/auth/Login";
import { toast, Toaster } from "sonner";
import PostUser from "./pages/postUser/PostUser";
import PostEdit from "./pages/postEdit/PostEdit";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageUserName = localStorage.getItem("username");
    if (localStorageUserName) {
      navigate("/"); // Agar foydalanuvchi avvaldan tizimga kirgan bo'lsa, bosh sahifaga o'tadi
    } else {
      navigate("/login"); // Kirilmagan bo'lsa, "Sign In" sahifasiga yo'naltiriladi
    }
  }, []); //

  return (
    <div>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sigin" element={<Sign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<PostUser />} />
        <Route path="/users/:id/edit" element={<PostEdit />} />
      </Routes>
    </div>
  );
};

export default App;
