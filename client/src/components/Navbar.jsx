import React from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



const Navbar = () => {
  const navigate = useNavigate();

  const token = useSelector((state)=> state?.auth?.accessToken)
  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-32 cursor-pointer sm:w-44"
      />

      {/* Button Container */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5 transition-all hover:bg-primary/90"
        >
          {!token?"Get Started":"Dashboard"}
          <img src={assets.arrow} alt="arrow" className="w-3" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
