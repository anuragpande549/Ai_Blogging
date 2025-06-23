import React, { useEffect, useState } from 'react';
import BlogTableItems from './admin/BlogTableItems';
import { getUserBlog } from '../context/fetchData';
import { useSelector } from 'react-redux';
import SkeletonRow from './admin/SkeletonRow';

function ListBlog() {
  const [blogs, setBlogs] = useState(false);
  const token = useSelector((state) => state?.auth?.accessToken);

  const page = { page: 1, limit: 20 };

  const fetchBlogs = async () => {
    const data = await getUserBlog("/blogs/user-post", page, token);
    if (data) setBlogs(data);
  };


  useEffect(() => {
    fetchBlogs();
  }, [token]);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">All Blogs</h1>

      <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 uppercase text-left">
            <tr>
              <th className="px-2 py-4 xl:px-6">#</th>
              <th className="px-2 py-4">Blog</th>
              <th className="px-2 py-4 max-sm:hidden">Date</th>
              <th className="px-2 py-4 max-sm:hidden">Status</th>
              <th className="px-2 py-4">Action</th>
              <th className="px-2 py-4">Edit</th>
              <th className="px-2 py-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {blogs?blogs.map((blog, index) => (
              <BlogTableItems key={blog._id} blog={blog}  index={index + 1} fetchBlog={fetchBlogs} />
            )):<SkeletonRow/>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListBlog;
