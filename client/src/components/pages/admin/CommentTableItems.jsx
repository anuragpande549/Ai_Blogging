import React from 'react'
import { assets } from '../../../assets/assets'

function CommentTableItems({ comment, fetchComments }) {
    const { blog, createdAt, _id } = comment;
    const BlogDate = new Date(createdAt);

    const getApprovalStatus = (comment) => {
        return comment.isApproved 
            ? <p className='text-xs border border-green-600 bg-green-100 rounded-full px-3 py-1'>Approved</p> 
            : <img src={assets.tick_icon} className='w-5 hover:scale-110 transition-all cursor-pointer' />;
    };

    return (
        <tr className='border-y border-gray-300'>
            <td className='px-6 py-4'>
                <b className='font-medium text-gray-600'>Blog</b>: {blog.title}
                <br />
                <br />
                <b className='font-medium text-gray-600'>Name</b>: {comment.name}
                <br />
                <b className='font-medium text-gray-600'>Comment</b>: {comment.content}
            </td>
            <td className='px-6 py-4'>
                {BlogDate.toLocaleDateString()}
                <div className='inline-flex items-center gap-4'>
                    {getApprovalStatus(comment)}
                    <img src={assets.bin_icon} alt="Delete" 
                        className='w-5 hover:scale-110 transition-all cursor-pointer' />
                </div> 
            </td>
        </tr>
    );
}

export default CommentTableItems;
