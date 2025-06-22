import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets, comments_data } from '../../assets/assets';
import Navbar from '../Navbar';
import Moment from 'moment';
import Footer from '../Footer';
import Loding from '../Loding';
import { getBlogData, addComment as postComment } from '../../context/fetchData';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comment, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const token = useSelector((state) => state?.auth?.accessToken);

  const fetchCommentData = async () => {
    setComments(comments_data); // Replace with API call if needed
  };

  const formData = {
    name,
    blogID:id,
    message:content
  }

  const handleAddComment = async (e) => {
    e.preventDefault();

    const result = await postComment('/comment/add', formData, token);

    if (result) {
      toast.success('Comment added! wait for approver by post owner');
      setContent('');
      // fetchBlogData(); // Uncomment if using real comment fetching
    } else {
      toast.error('Failed to add comment');
    }

  };

  const fetchBlogData = async () => {
    const response = await getBlogData('/blogs/get-blog', id);
    console.log(response.data)
    setData(response.data);
    setName(response.data.userDetails.name || '');

    setComments(response?.data?.blogDetails?.comments)
  };

  useEffect(() => {
    fetchBlogData();
    fetchCommentData();
  }, []);

  if (!data) return <Loding />;

  return (
    <div className='relative'>
      <img src={assets.gradientBackground} alt='' className='absolute -top-50 -z-1 opacity-50' />
      <Navbar />

      <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary py-4 font-medium'>
          Published On {Moment(data.blogDetails.createdAt).format('MMMM Do YYYY')}
        </p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>
          {data.blogDetails.title}
        </h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.blogDetails.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 font-medium text-primary'>
          {name}
        </p>
      </div>

      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.blogDetails.image} alt='' className='rounded-3xl mb-5' />
        <div
          dangerouslySetInnerHTML={{ __html: data.blogDetails.description }}
          className='rich-text'
        ></div>
      </div>

      {/* Comment Section */}
      <div className='mt-14 mb-10 max-w-3xl mx-auto'>
        <p className='font-semibold text-xl'>Comments ({comment.length})</p>
        <div className='flex flex-col gap-4'>
          {comment.map((item, index) => (
            <div
              key={item?._id}
              className='relative bg-primary/5 border border-primary/10 max-w-xl p-4 rounded text-gray-600'
            >
              <div className='flex items-center gap-2 mb-2'>
                <img src={assets.user_icon} alt='' className='w-6' />
                <p className='font-medium'>{item?.user}</p>
              </div>
              <p>{item.content}</p>
              <p className='absolute right-4 bottom-3 text-xs text-gray-400'>
                {Moment(item.createdAt).fromNow()}
              </p>
            </div>
          ))}
        </div>

        {/* Add Comment Form */}
        <div className='mt-10'>
          <p className='font-semibold mb-4'>Add your comment</p>
          <form onSubmit={handleAddComment} className='flex flex-col items-start gap-4 max-w-lg'>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type='text'
              placeholder='Your Name'
              required
              className='w-full p-2 border border-gray-300 rounded outline-none'
            />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder='Comment'
              className='w-full p-2 border border-gray-300 rounded outline-none h-48'
              required
            ></textarea>
            <button
              type='submit'
              className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'
            >
              Submit
            </button>
          </form>
        </div>

        {/* Share Section */}
        <div className='my-24'>
          <p className='font-semibold my-4'>Share this post on social media</p>
          <div className='flex gap-4'>
            <img src={assets.facebook_icon} width={50} alt='Facebook' />
            <img src={assets.twitter_icon} width={50} alt='Twitter' />
            <img src={assets.googleplus_icon} width={50} alt='Google Plus' />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
