import React, { useEffect, useState, useRef } from 'react';
import { assets, blogCategories } from '../assets/assets';
import Quill from 'quill';
import { generateBlog, submitBlog, updateBlog } from '../context/fetchData';
import { useSelector } from 'react-redux';
import { parse } from 'marked';
import AIGeneratingOverlay from './admin/AIGeneratingOverlay';
import { useLocation } from 'react-router-dom';

function AddBlog() {
  const location = useLocation();
  const blog = location?.state;

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        },
        placeholder: 'Write your blog content here...',
      });

      // Load blog data after Quill initialized
      if (blog) {
        setTimeout(() => {
          setTitle(blog?.title || '');
          setSubTitle(blog?.subTitle || '');
          setCategory(blog?.category[0]?.name || '');
          setIsPublished(blog?.isPublish || false);
          if (blog?.description) {
            quillRef.current.root.innerHTML = parse(blog.description);
          }
        }, 0);
      }
    }
  }, [blog]);

  const clearBlog = () => {
    setImage(null);
    setTitle('');
    setSubTitle('');
    setCategory('');
    setIsPublished(false);
    if (quillRef.current) quillRef.current.setText('');
  };

  const generateContent = async () => {
    setIsGenerating(true);
    const description = JSON.stringify(quillRef.current.getContents());
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subTitle', subTitle);
    formData.append('description', description);

    const data = await generateBlog('/blogs/generate', formData, token);
    if (data?.message?.data) {
      quillRef.current.root.innerHTML = parse(data.message.data);
    }
    setIsGenerating(false);
  };

  const formDataGen = () => {
    const description = quillRef.current.root.innerHTML;
    const formData = new FormData();

    formData.append('title', title);
    formData.append('subTitle', subTitle);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('isPublish', isPublished);
    formData.append('blogId', blog?._id);

    // If new image selected, append it
    if (image && typeof image !== 'string') {
      formData.append('image',image);
    }

    return formData;
  };

  const submitForm = async () => {
    const formData = formDataGen();

    await submitBlog('/blogs/create-blog', formData, token);
  };

  const updateData = async () => {
    const formData = formDataGen();
    await updateBlog(`/blogs/update-blog`, formData, token); // assuming PUT method for update
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    blog ? await updateData() : await submitForm();
    setIsAdding(false);
    clearBlog();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-auto p-4 sm:p-10"
    >
      <div className="bg-white w-full max-w-full sm:max-w-3xl p-4 sm:p-10 sm:m-10 shadow rounded">
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img
            src={
              image
                ? typeof image === 'string'
                  ? image
                  : URL.createObjectURL(image)
                : blog?.image || assets.upload_area
            }
            alt="thumbnail"
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) setImage(file);
            }}
            type="file"
            id="image"
            hidden
          />
        </label>

        <p>Blog Title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <p>Sub Title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
        />

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-72 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef} className="h-full" />
          {isGenerating && <AIGeneratingOverlay />}
          <button
            type="button"
            onClick={generateContent}
            className="absolute bottom-1 right-2 ml-2 text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            {isGenerating ? 'Generating ...' : 'Generate With AI'}
          </button>
        </div>

        <p className="mt-4">Blog Category</p>
        <select
          name="category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded w-full max-w-lg"
          required
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="mt-4 flex items-center">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer ml-2"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        <button
          type="submit"
          className="mt-8 w-32 sm:w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
        >
          {blog
            ? isAdding
              ? 'Updating Blog...'
              : 'Update Blog'
            : isAdding
            ? 'Adding Blog...'
            : 'Add Blog'}
        </button>
      </div>
    </form>
  );
}

export default AddBlog;
