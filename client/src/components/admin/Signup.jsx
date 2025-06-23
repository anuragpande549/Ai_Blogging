import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signUp } from '../../context/fetchData';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    setProfileImage(null);
  };

  const submitProfile = async () => {
        setIsSubmitting(true);
    if (!name || !email || !phone || !password || !confirmPassword || !profileImage) {
      toast.error('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phoneNumber', phone);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('avatar', profileImage); // Ensure backend expects 'avatar'

    const data = await signUp("/user/register", formData);
    if(data){

      setIsSubmitting(false);
      resetForm()
      navigate("/login")
    }
  

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match!');
    }
    submitProfile();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            <span className="text-primary">User</span> Signup
          </h1>
          <p className="font-light">Register to access your account</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 text-gray-600">
          <div className="flex flex-col mb-4">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter your name" className="border-b-2 border-gray-300 p-2 outline-none" />
          </div>
          <div className="flex flex-col mb-4">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" className="border-b-2 border-gray-300 p-2 outline-none" />
          </div>
          <div className="flex flex-col mb-4">
            <label>Phone Number</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="Enter your phone number" className="border-b-2 border-gray-300 p-2 outline-none" />
          </div>
          <div className="flex flex-col mb-4">
            <label>Profile Image</label>
            <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} className="border-b-2 border-gray-300 p-2 outline-none" />
          </div>
          <div className="flex flex-col mb-4">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter password" className="border-b-2 border-gray-300 p-2 outline-none" />
          </div>
          <div className="flex flex-col mb-4">
            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Confirm password" className="border-b-2 border-gray-300 p-2 outline-none" />
          </div>
          <p className="font-light mb-5">
            Already have an account?{' '}
            <Link to="/login">
              <span className="text-xl font-bold text-primary cursor-pointer">Login</span>
            </Link>
          </p>
          <button type="submit" disabled={isSubmitting} className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all">
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
