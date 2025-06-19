import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { logIn } from '../../context/fetchData';
import { addToken } from '../redux/appSlice';
import { useDispatch } from 'react-redux';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch()

  const clearFormData = () => {
    setEmail('');
    setPassword('');
  };

  const submitForm = async () => {
    if (!email || !password) {
      toast.error('Both email and password are required');
      return;
    }

    setIsLogin(true);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
    const data = await logIn('/user/logIn', formData);
    console.log(data);
      dispatch(addToken(data.accessToken));
    //  setToken(data.accessToken)
     localStorage.setItem("accessToken", data.accessToken);
      clearFormData();
    } catch (error) {
      const message = error?.response?.data?.message || error.message || 'Something went wrong';
      toast.error(message);
    } finally {
      setIsLogin(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='text-center mb-6'>
          <h1 className='text-3xl font-bold'><span className='text-primary'>Admin</span> Login</h1>
          <p className='font-light'>Enter your credentials to access the admin panel</p>
        </div>
        <form onSubmit={handleSubmit} className='w-full text-gray-600'>
          <div className='flex flex-col mb-6'>
            <label>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Your email ID'
              className='border-b-2 border-gray-300 p-2 outline-none'
            />
          </div>
          <div className='flex flex-col mb-6'>
            <label>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Your password'
              className='border-b-2 border-gray-300 p-2 outline-none'
            />
          </div>
          <button
            type='submit'
            className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all'
            disabled={isLogin}
          >
            {isLogin ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
