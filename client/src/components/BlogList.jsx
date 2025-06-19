import React, { useState, useEffect } from 'react';
import { getData } from '../context/fetchData';
import Loding from './Loding';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, addBlogs } from './redux/appSlice';
import BlogCard from './BlogCard'; // Make sure this is uncommented and the component exists

const BlogList = () => {
  const [menu, setMenu] = useState('All');

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.homePage.blogs[0]);
  const category = useSelector((state) => state.homePage.category[0]);

  useEffect(() => {
    async function fetchBlogData() {
      const data = await getData('blogs');
      dispatch(addBlogs(data.blogs));
      dispatch(addCategory(data.category));
    }
    fetchBlogData();
  }, [dispatch]);

  if (!blogs) return <Loding />;

  return (
    <div>
      {/* Category Filters */}
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative flex-wrap'>
        <div className='relative'>
          <button
            onClick={() => setMenu('All')}
            className={`cursor-pointer text-gray-500 ${menu === 'All' && 'text-white px-4 pt-0.5'}`}
          >
            All
            {menu === 'All' && (
              <div className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full'></div>
            )}
          </button>
        </div>

        {category.map((item) => (
          <div key={item._id} className='relative'>
            <button
              onClick={() => setMenu(item.name)}
              className={`cursor-pointer text-gray-500 ${menu === item.name && 'text-white px-4 pt-0.5'}`}
            >
              {item.name}
              {menu === item.name && (
                <div className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full'></div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
        {blogs
          .filter((blog) =>
            menu === 'All' ? true : blog.category?.[0]?.name === menu
          )
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
