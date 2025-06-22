import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Blog from "./components/pages/Blog";
import Layout from "./components/Layout";
import Dashboard from "./components/admin/Dashboard";
import AddBlog from "./components/AddBlog";
import ListBlog from "./components/ListBlog";
import Comments from "./components/Comments";
import Login from "./components/admin/Login";
import "quill/dist/quill.snow.css";
import Signup from "./components/admin/Signup";
import {Toaster} from "react-hot-toast"
import { useSelector } from "react-redux";


const App = () => {
  
  const token = useSelector((state)=>state?.auth?.accessToken);
  console.log("token:", token)

  
 // Replace this with actual authentication logic

  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />

        {/* Admin Route with Authentication Check */}
        <Route path="admin" element={token ? <Layout /> : <Signup />}>
          <Route index element={<Dashboard />} />
          <Route path="addBlog/:id?" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>

        {/* Signup Route */}
        <Route path="/login" element={token ? <Layout /> : <Login />} />
        
      </Routes>
    </div>
  );
};

export default App;
