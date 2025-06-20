import React, { useState, useEffect } from "react";
import { assets, dashboard_data } from "../../assets/assets";
import BlogTableItems from "./BlogTableItems";
import { getUserBlog } from "../../context/fetchData";
import {useSelector} from "react-redux"

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  });
  const [page, setPage] = useState({
    page:1,
    limit:10
  }) 
  const token = useSelector((state)=> state?.auth?.accessToken)

  useEffect(() => {
    fetchDashboard();
  }, []);

const fetchDashboard = async () => {
  const data = await getUserBlog("/blogs/user-post", page, token);
  console.log(data);

  const publishedCount = data.filter((item) => item.isPublish === true).length;
  const draftCount = data.filter((item) => item.isPublish === false).length;

  setDashboardData({
    blogs: data.length,
    comments: 0,
    drafts: draftCount,
    recentBlogs: data
  });
};


  return (
    <div className="flex-1 w-full p-4 md:p-10 bg-blue-50/50">
      <div className="flex flex-wrap gap-4">
        {[
          { count: dashboardData.blogs, label: "Blogs", icon: assets.dashboard_icon_1 },
          { count: dashboardData.comments, label: "Comments", icon: assets.dashboard_icon_2 },
          { count: dashboardData.drafts, label: "Drafts", icon: assets.dashboard_icon_3 },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-white p-4 min-w-[258px] rounded shadow cursor-pointer hover:scale-105 transition-all"
          >
            <img src={item.icon} alt={item.label} />
            <div>
              <p className="text-xl font-semibold text-gray-600">{item.count}</p>
              <p className="text-gray-400 font-light">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
        <img src={assets.dashboard_icon_4} alt="Latest Blogs" />
        <p>Latest Blogs</p>
      </div>

      <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase">
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
            {dashboardData.recentBlogs.slice(0,5).map((blog, index) => (
             <BlogTableItems key={blog._id} blog={blog} fetchBlog={fetchDashboard} index={index + 1} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
