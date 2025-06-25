import React, { useState } from 'react';
import { logIn } from '../../context/fetchData';
import { addToken } from '../redux/appSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function DemoLogin() {

const [isTrue , setIsTrue] = useState(false);
const navigator = useNavigate()
const dispatch = useDispatch()

  const demoData = {
    email:"anurag@gmail.com",
    password:"Anurag@10"
  }

  const handleDemoLogin =async () => {

   setIsTrue(true);

      try {
          const data = await logIn('/user/logIn', demoData);
          console.log(data);
          dispatch(addToken(data.accessToken));
          document.cookie = `accessToken=${data.accessToken}; max-age=${60 * 60 * 24}; path=/; secure; SameSite=Strict`;
          navigator("/admin")
      } catch (error) {
          const message = error?.response?.data?.message || error.message || 'Something went wrong';
          toast.error(message);
      } finally {
          setIsTrue(false);
      }

  };

  return (

      <button
        onClick={handleDemoLogin}
            className='w-full py-3 font-medium bg-blue-600 mt-5 text-white rounded cursor-pointer hover:bg-blue-600/80 transition-all'
      >
        {isTrue?"Demo Login ....":"Demo Login"}
      </button>

  );
}

export default DemoLogin;
