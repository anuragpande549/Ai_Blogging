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

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
      fetchBlogData();
    } else {
      toast.error('Failed to add comment.');
    }
  };

  const fetchBlogData = async () => {
    setIsLoading(true);
    try {
      const response = await getBlogData('/blogs/get-blog', id);
      setData(response.data);
      setComments(response?.data?.blogDetails?.comments || []);
    } catch (error) {
      toast.error('Failed to load blog');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [id]);

  if (isLoading) return <Loding />;

  return (
    <div className='relative overflow-x-hidden'>
      <img 
        src={assets.gradientBackground} 
        alt='' 
        className='absolute top-0 left-0 w-full h-full -z-10 opacity-50 object-cover'
      />
      <Navbar />

      {/* Hero Section */}
      <section className='text-center mt-16 md:mt-28 px-4 text-gray-600'>
        <p className='text-primary py-4 font-medium'>
          Published On {Moment(data.blogDetails.createdAt).format('MMMM Do YYYY')}
        </p>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold mx-auto text-gray-800 max-w-4xl'>
          {data.blogDetails.title}
        </h1>
        <h2 className='my-5 mx-auto text-gray-600 max-w-2xl text-lg md:text-xl'>
          {data.blogDetails.subTitle}
        </h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 font-medium text-primary'>
          {data.userDetails.name}
        </p>
      </section>

      {/* Blog Content */}
      <div className='mx-4 sm:mx-6 md:mx-8 lg:mx-auto max-w-4xl xl:max-w-5xl my-10'>
        <div className='overflow-hidden rounded-2xl md:rounded-3xl shadow-lg mb-8'>
          <img
            src={data.blogDetails.image}
            alt={data.blogDetails.title}
            className='w-full h-auto object-cover'
          />
        </div>
        
        <div
          className='rich-text text-gray-700 leading-relaxed text-lg'
          dangerouslySetInnerHTML={{ __html: data.blogDetails.description }}
        ></div>
      </div>

      {/* Comments Section */}
      <section className='mt-14 mb-10 mx-4 sm:mx-6 md:mx-8 lg:mx-auto max-w-3xl'>
        <h3 className='font-semibold text-2xl mb-6'>
          Comments ({comments.length})
        </h3>
        
        <div className='flex flex-col gap-5'>
          {comments.map((item) => (
            <div
              key={item._id}
              className='bg-white p-5 rounded-xl shadow-md border border-gray-100'
            >
              <div className='flex items-center gap-3 mb-3'>
                <div className='bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16' />
                <div>
                  <p className='font-semibold'>{item?.user || 'Anonymous'}</p>
                  <p className='text-sm text-gray-500'>
                    {Moment(item.createdAt).fromNow()}
                  </p>
                </div>
              </div>
              <p className='text-gray-700'>{item.content}</p>
            </div>
          ))}
        </div>

        {/* Add Comment Form */}
        <div className='mt-14 p-6 bg-white rounded-xl shadow-md'>
          <h3 className='font-semibold text-xl mb-5'>
            Add your comment
          </h3>
          <form onSubmit={handleAddComment} className='flex flex-col gap-5'>
            <input
              type='text'
              placeholder='Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary'
            />
            <textarea
              placeholder='Write a comment...'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className='w-full p-3 border border-gray-300 rounded-lg outline-none h-32 resize-none focus:ring-2 focus:ring-primary'
            />
            <button
              type='submit'
              className='bg-primary text-white rounded-lg py-3 px-8 font-medium text-lg self-start hover:bg-primary/90 transition-colors'
            >
              Submit Comment
            </button>
          </form>
        </div>

        {/* Share Section */}
        <div className='my-16 text-center'>
          <h3 className='font-semibold text-2xl mb-6'>
            Share this post
          </h3>
          <div className='flex justify-center gap-6 flex-wrap'>
            {[
              { icon: assets.facebook_icon, name: 'Facebook' },
              { icon: assets.twitter_icon, name: 'Twitter' },
              { icon: assets.googleplus_icon, name: 'LinkedIn' },
            ].map((social, i) => (
              <div
                key={i}
                className='flex flex-col items-center cursor-pointer'
              >
                <div className='bg-gray-100 p-4 rounded-full hover:bg-primary/10 transition-colors'>
                  <img 
                    src={social.icon} 
                    alt={social.name}
                    className='w-8 h-8 object-contain'
                  />
                </div>
                <span className='mt-2 text-gray-600 hover:text-primary transition-colors'>
                  {social.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;