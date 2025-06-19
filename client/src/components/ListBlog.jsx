import React, { useEffect, useState } from 'react'
import BlogTableItems from './admin/BlogTableItems';
import { blog_data } from '../assets/assets';

function ListBlog() {
const [blogs, setBlogs] = useState([]);

const fetchBlogs = async () =>{
  setBlogs(blog_data)

}

useEffect(()=>{
  fetchBlogs()
},[])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <h1>All blogs</h1>

      <div className='relative h-4/5 max-w-4xl overflow mt-4 x-auto shadow rounded-lg scrollbar-hide bg-white'>
        <table className='text-xs text-left text-gray-500'>
          <thead>

          <tr>
            <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
            <th scope='col' className='px-2 py-4 xl:px-6'>Blog Title</th>
            <th scope='col' className='px-2 py-4 xl:px-6'>Date</th>
            <th scope='col' className='px-2 py-4 xl:px-6'>status</th>
            <th scope='col' className='px-2 py-4 xl:px-6'>Actions</th>
          </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index)=>{
              return <BlogTableItems key={blog._id} blog={blog}
              fetchBlog={fetchBlogs} index={index+1}/>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListBlog