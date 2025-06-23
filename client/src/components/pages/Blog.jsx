import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import Navbar from '../Navbar';
import Moment from 'moment';
import Footer from '../Footer';
import Loding from '../Loding';
import { getBlogData, addComment as postComment } from '../../context/fetchData';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const token = useSelector((state) => state?.auth?.accessToken);

  const formData = {
    name,
    blogID: id,
    message: content,
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    const result = await postComment('/comment/add', formData, token);

    if (result) {
      toast.success('Comment added! Waiting for approval.');
      setContent('');
    } else {
      toast.error('Failed to add comment.');
    }
  };

  const fetchBlogData = async () => {
    const response = await getBlogData('/blogs/get-blog', id);
    setData(response.data);
    setComments(response?.data?.blogDetails?.comments || []);
  };

  useEffect(() => {
    fetchBlogData();
  }, [id]);

  if (!data) return <Loding />;

  return (
    <div className='relative'>
      <img src={assets.gradientBackground} alt='' className='absolute -top-50 -z-10 opacity-50' />
      <Navbar />

      <motion.div
        className='text-center mt-20 text-gray-600'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className='text-primary py-4 font-medium'>
          Published On {Moment(data.blogDetails.createdAt).format('MMMM Do YYYY')}
        </p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>
          {data.blogDetails.title}
        </h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.blogDetails.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 font-medium text-primary'>
          {data.userDetails.name}
        </p>
      </motion.div>

      <div className='mx-5 max-w-5xl md:mx-auto my-10'>
        <motion.img
          src={data.blogDetails.image}
          alt=''
          className='rounded-3xl mb-5'
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        />
        <div
          dangerouslySetInnerHTML={{ __html: data.blogDetails.description }}
          className='rich-text text-gray-700 leading-relaxed'
        ></div>
      </div>

      {/* Comments */}
      <motion.div
        className='mt-14 mb-10 max-w-3xl mx-auto'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className='font-semibold text-xl mb-4'>Comments ({comments.length})</p>
        <div className='flex flex-col gap-4'>
          {comments.map((item) => (
            <motion.div
              key={item._id}
              className='relative bg-primary/5 border border-primary/10 max-w-xl p-4 rounded text-gray-600'
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className='flex items-center gap-2 mb-2'>
                <img src={assets.user_icon} alt='' className='w-6' />
                <p className='font-medium'>{item?.user || 'Anonymous'}</p>
              </div>
              <p>{item.content}</p>
              <p className='absolute right-4 bottom-3 text-xs text-gray-400'>
                {Moment(item.createdAt).fromNow()}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Add Comment */}
        <div className='mt-10'>
          <p className='font-semibold mb-4'>Add your comment</p>
          <form onSubmit={handleAddComment} className='flex flex-col gap-4 max-w-lg'>
            <input
              type='text'
              placeholder='Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='w-full p-3 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-primary'
            />
            <textarea
              placeholder='Write a comment...'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className='w-full p-3 border border-gray-300 rounded outline-none h-40 resize-none focus:ring-2 focus:ring-primary'
            />
            <button
              type='submit'
              className='bg-primary text-white rounded p-2 px-6 font-medium hover:bg-primary/90 transition-all'
            >
              Submit
            </button>
          </form>
        </div>

        {/* Share Buttons */}
        <div className='my-24'>
          <p className='font-semibold mb-4'>Share this post</p>
          <div className='flex gap-4'>
            {[assets.facebook_icon, assets.twitter_icon, assets.googleplus_icon].map((icon, i) => (
              <motion.img
                key={i}
                src={icon}
                alt='social'
                width={50}
                whileHover={{ scale: 1.1 }}
                className='cursor-pointer'
              />
            ))}
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Blog;
