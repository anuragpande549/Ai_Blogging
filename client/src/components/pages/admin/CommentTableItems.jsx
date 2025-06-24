import React from 'react';
import { assets } from '../../../assets/assets';
import { useSelector } from 'react-redux';
import { putStatus, deleteComment as removeComment } from '../../../context/fetchData';
import toast from 'react-hot-toast';

function CommentTableItems({ comment, index, fetchComments }) {
  const { blog, isApproved, createdAt, _id, name, user, content } = comment;
  const BlogDate = new Date(createdAt);
  const token = useSelector((state) => state?.auth?.accessToken);

  const updateStatus = async () => {
    const data = await putStatus("/comment/status", { commentID: _id, status: !isApproved }, token);
    if (data) toast.success("Status updated!");
    fetchComments?.();
  };

  console.log({comment});
  const handleDelete = async () => {
    const data = await removeComment("/comment/delete", {commentID:_id, blogID:blog?._id} , token);
    if (data) toast.success("Comment deleted!");
    fetchComments?.();
  };

  const getApprovalStatus = () => {
    return isApproved ? (
      <p className='text-xs border border-green-600 bg-green-100 text-green-700 rounded-full px-3 py-1'>Approved</p>
    ) : (
      <img
        src={assets.tick_icon}
        alt="Approve"
        className='w-5 hover:scale-110 transition-all cursor-pointer'
        onClick={updateStatus}
      />
    );
  };

  return (
    <tr className='border-y border-gray-300'>
      <td className='px-6 text-xl font-bold py-4'>{index}</td>

      <td className='px-6 py-4'>
        <p><b className='font-medium text-gray-600'>Blog</b>: {blog.title}</p>
        <p><b className='font-medium text-gray-600'>Name</b>: {user}</p>
        <p><b className='font-medium text-gray-600'>Comment</b>: {content}</p>
      </td>

      <td className='px-6 py-4 max-s:hidden'>
        {BlogDate.toLocaleDateString()}
      </td>

<td className='px-6 py-4 flex justify-center items-center gap-x-4'>
  <div className='mb-2'>
    {getApprovalStatus()}
  </div>
  <img
    onClick={handleDelete}
    src={assets.bin_icon}
    alt="Delete"
    className='w-5 hover:scale-110 transition-all cursor-pointer'
  />
</td>

    </tr>
  );
}

export default CommentTableItems;