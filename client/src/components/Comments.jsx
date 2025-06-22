import React, { useEffect, useState } from 'react'
import CommentTableItems from './pages/admin/CommentTableItems'
import { comments_data } from '../assets/assets'
import { useSelector } from 'react-redux'
import {getComment} from "../context/fetchData.js"
import toast from 'react-hot-toast'
import SkeletonRow from './admin/SkeletonRow.jsx'

function Comments() {
  const [comments, setComments] = useState()
  const [filter, setFilter] = useState("Not Approved")

  const token = useSelector((state)=>state?.auth?.accessToken)
  
  console.log(comments)
  
  const fetchComments = async () => {
    const commentData = await getComment("/comment",token)

    if(commentData && Array.isArray(commentData)) setComments(commentData);
    
  }

  useEffect(() => {
    fetchComments()
  }, [])
  // return(<></>)

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <div className='flex justify-between items-center max-w-3xl'>
        <h1>Comments</h1>
        <div className='flex gap-4'>
          <button 
            onClick={() => setFilter('Approved')}
            className={`shadow-custom-sm border rounded-full px-5 py-1 cursor-pointer text-xs ${filter === 'Approved' ? 'text-primary' : 'text-gray-700'}`}>
            Approved
          </button>
          <button 
            onClick={() => setFilter('Not Approved')}
            className={`shadow-custom-sm border rounded-full px-5 py-1 cursor-pointer text-xs ${filter === 'Not Approved' ? 'text-primary' : 'text-gray-700'}`}>
            Not Approved
          </button>
        </div>
      </div>
      <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead>
            <tr>
              <th scope='col' className='px-6 py-3'>index</th>
              <th scope='col' className='px-6 py-3'>Blog Title & Comments</th>
              <th scope='col' className='px-6 py-3 max-s:hidden'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
          {comments ? comments.map((list)=>(
          
           list.comments.filter((listItems) => filter === "Approved" ? listItems.isApproved === true : listItems.isApproved === false)
           .map((comments,index)=>(
   

              <CommentTableItems 
              key={comments._id} 
              comment={comments} 
              index={index + 1} 
              fetchComments={fetchComments} 
              />
            
           ))
          )) : <SkeletonRow />}

            {/* {comments.filter((comment) => filter === "Approved" ? comment.isApproved === true : comment.isApproved === false)
            
            //   .map((comment, index) => (
            // ))
            } */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comments
