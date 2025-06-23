import React from 'react'
import { assets } from '../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './admin/Sidebar';
import toast from 'react-hot-toast';
import { logOut } from '../context/fetchData.js';
import { addToken } from './redux/appSlice.js';
import { useDispatch, useSelector } from 'react-redux';


function Layout() {
const token = useSelector((state) => state?.auth?.accessToken);
  
  const dispatch = useDispatch();
const navigator = useNavigate();


const navigateHome = ()=>{
  navigator("/")
}

  const logout =async () => {
    try {
      const data =await logOut("/user/logOut", token);
      if(data.success){

        dispatch(addToken(false));
        document.cookie = "accessToken=; max-age=0; path=/; secure; SameSite=Strict";
        toast.success("LogOut Success")
        navigateHome()
      }
      console.log("logOut :",data);
    } catch (error) {
      console.log(error.massage);
      toast.error("LogOut Failed")
    }

  }
  return (
<>
    <div className='flex items-center justify-between py-2 h-[70px] px-4
    sm:px-12 border-b border-gray-200'>
        <img src={assets.logo} alt=""  
        onClick={navigateHome}
        className='w-32 sm:w-40 cursor-pointer'
         />
         <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full
         cursor-pointer'> Logout</button>
    </div>
    <div className=''>
        <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar/>
        <Outlet/>
        </div>
    </div>
</>
  )
}

export default Layout