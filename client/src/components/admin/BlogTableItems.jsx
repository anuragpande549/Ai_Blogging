import { useState } from "react";
import cross_icon from "../../assets/cross_icon.svg";
import { changePublish,postDelete } from "../../context/fetchData";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";
import SkeletonRow from "./SkeletonRow";

function BlogTableItems({ blog, index, fetchBlog }) {
  const { title, createdAt, _id, description, isPublish ,subTitle} = blog;
  const BlogDate = new Date(createdAt);

const [actionLoading, setActionLoading] = useState(false);
const token = useSelector((state)=>state?.auth?.accessToken)

const ToggleDelete = async () => {
  const confirmDelete = window.confirm(`Do you want to delete "${title}"?`);
  if (!confirmDelete) return;

  await postDelete("/blogs/delete-blog",{ blogId:_id }, token);
    fetchBlog?.(); // Refresh blog list

};


  const togglePublish = async () => {
    setActionLoading(true);
    try {
      await changePublish("/blogs/publish-update", {
        blogId: _id,
        isPublish: !isPublish, // Toggle state
      },token);
      fetchBlog?.(); // Refresh blog list if provided
    } catch (err) {
      console.error("Failed to update publish status", err);
    }
    setActionLoading(false);
  };


  return ( 
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
      <td
        className={`px-2 py-4 ${
          isPublish ? "text-green-600" : "text-red-600"
        }`}
      >
        {isPublish ? "Published" : "Unpublished"}
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button
          onClick={togglePublish}
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
          disabled={actionLoading}
        >
          {actionLoading
            ? "Updating..."
            : isPublish
            ? "Unpublish"
            : "Publish"}
        </button>
      </td>
      <td className="w-8 hover:scale-110 transition-all cursor-pointer text-center">
      <Link to="/admin/addBlog"
      state={blog}
      >
        ✒️
      </Link>
      </td>
      <td className="px-2 py-4 text-center">
        <img onClick={ToggleDelete}
          src={cross_icon}
          className="w-6 hover:scale-110 transition-all cursor-pointer mx-auto"
          alt="Delete"
        />
      </td>
    </tr>
  );
}

export default BlogTableItems;
