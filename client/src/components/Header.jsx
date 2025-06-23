import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { searchAdd } from './redux/appSlice';

function Header() {
  const [search, setSearch] = useState('');
  const blogs = useSelector((state) => state?.homePage?.blogs || []);
  const dispatch = useDispatch();

  if(search.trim() === ""){
    dispatch(searchAdd(false))
  }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className='text-center mt-20 mb-8'>
        {/* Animated Badge */}
        <motion.div
          className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4
            border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1.1, 1], opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p>New: AI feature integration</p>
          <img src={assets.star_icon} alt='star-icon' className='w-2.5' />
        </motion.div>

        {/* Animated Heading */}
        <motion.h1
          className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Your <span className='text-primary'>AI-powered</span> blogging platform
        </motion.h1>

        {/* Animated Subtext */}
        <motion.p
          className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Create, share, and discover amazing stories with ease. Experience seamless writing, powerful AI tools, and a vibrant community—all in one place.
        </motion.p>

        {/* Animated Form */}
        <motion.form
          className='flex items-center justify-center gap-2 max-w-md mx-auto mt-6'
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.7 }}
                  onSubmit={e => {
                      e.preventDefault();
                      if (search.trim()) {
                          const filteredBlogs = blogs[0].filter((item) =>
                              item.title.toLowerCase().includes(search.toLowerCase())
                          );
                          dispatch(searchAdd(filteredBlogs));
                          console.log(filteredBlogs);
                      }

                  }}
        >
          <motion.input
            type='text'
            placeholder='Search for blogs'
            value={search}
            onChange={e => setSearch(e.target.value)}
            required
            className='flex-1 px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition text-sm'
            whileFocus={{ scale: 1.02, borderColor: '#3B82F6' }}
          />
          <motion.button
            type='submit'
            className='px-6 py-2 bg-primary text-white rounded-r-full font-semibold shadow hover:bg-primary/90 transition text-sm'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Search
          </motion.button>
        </motion.form>
      </div>

      {/* Background Animation */}
      <motion.img
        src={assets.gradientBackground}
        alt=''
        className='absolute -top-1/4 left-1/2 -translate-x-1/2 -z-10 opacity-50 w-[150%]'
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, ease: 'linear', repeat: Infinity }}
      />
    </div>
  );
}

export default Header;
