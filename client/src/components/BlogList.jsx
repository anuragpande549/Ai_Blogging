import React, { useState, useEffect } from 'react';
import { getData } from '../context/fetchData';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, addBlogs, searchAdd } from './redux/appSlice';
import BlogCard from './BlogCard';
import BlogSkeleton from './BlogSkeleton';
import { motion, AnimatePresence } from 'framer-motion';


const BlogList = () => {
  const [menu, setMenu] = useState('All');

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.homePage.blogs[0]);
  const category = useSelector((state) => state.homePage.category[0]);
  const search = useSelector((state)=>state.search)

  useEffect(() => {
    async function fetchBlogData() {
      const data = await getData('blogs');
      dispatch(addBlogs(data.blogs));
      dispatch(addCategory(data.category));
    }
    fetchBlogData();
  }, [dispatch]);

  if (!blogs) return <BlogSkeleton />;

  return (
    <div>
      {/* Category Filters */}
      <motion.div
        className='flex justify-center gap-4 sm:gap-8 my-10 relative flex-wrap'
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        { search ? ( 
          <button 
          onClick={()=> dispatch(searchAdd(false))}
          className='cursor-pointer px-4 py-1 rounded-full border text-white border-gray-300 bg-red-500 text-sm font-medium'
          >
            Cancel ❌
          </button>
        ) : (category.map((item) => (
          <motion.div key={item._id} className='relative'>
            <button
              onClick={() => setMenu(item.name)}
              className={`cursor-pointer px-4 py-1 rounded-full border border-gray-300 transition-all 
              duration-300 ease-in-out text-sm font-medium
              ${menu === item.name
                  ? 'bg-primary text-white shadow'
                  : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {item.name}
            </button>
          </motion.div>
        )))}
      </motion.div>

      {/* Blog Cards */}
      <motion.div
        layout
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'
      >
        <AnimatePresence>
          {search?
          (search.map((blog)=>(
                          <motion.div
                key={blog._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <BlogCard blog={blog} />
              </motion.div>
          )))
          :blogs
            .filter((blog) =>
              menu === 'All' ? true : blog.category?.[0]?.name === menu
            )
            .map((blog) => (
              <motion.div
                key={blog._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default BlogList;
