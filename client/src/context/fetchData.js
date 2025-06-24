import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
// axios.defaults.withCredentials = true




const getData = async (url) => {
  try {
    const { data } = await axios.get(url);
    if (data.success) {
      return data.data; // Return the blogs and category
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Something went wrong";
    toast.error(message);
  }
};


const signUp = async (url, formData) => {
  try {
    const { data } = await axios.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(data);
    if (data.success) {
      toast.success(data.data);
      return data;
    } else {
      toast.error(data.data);
    }
  } catch (error) {
    const message = error?.response?.data?.data || error.message || "Something went wrong";
    toast.error(message);
    console.log(error);
    return false;
  }
};
const logIn = async (url, formData) => {
  try {
    const { data } = await axios.post(url, formData,{
      headers:{"Content-Type": "application/json"}
    });

    if (data.success) {
      toast.success(data.message);
      return data.data;
    } else {
      toast.error(data.message || "Request failed");
      return false;
    }
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Something went wrong";
    toast.error(message);
    return false;
  }
};

const logOut = async (url, token) => {
  console.log({url, token})
  try {
    const { data } = await axios.post(
      url,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      }
    );

    if (data.success) {
      return data;
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Something went wrong";
    toast.error(message);
  }
};



const submitBlog = async (url, formData, token) => {
  try {
    const { data } = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });

    if (data.success) {
      toast.success('Blog submitted successfully');
      console.log('Blog Data:', data);
      return data;
    } else {
      toast.error('Submission failed');
      return false;
    }
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || 'Something went wrong';
    toast.error(message);
    console.error('Error submitting blog:', message);
    return false;
  }
};

const generateBlog = async (url, formData, token) => {
  try {
    const { data } = await axios.post(url, formData, {
      headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (data.success) {
      toast.success('Blog submitted successfully');
      console.log('Blog Data:', data);
      return data;
    } else {
      toast.error('Submission failed');
      return false;
    }
  } catch (error) {
    const message = error?.response?.data?.message?.message || error.message || 'Something went wrong';
    toast.error(message);
    console.error('Error submitting blog:', message);
    return false;
  }
};

const getBlogData = async (url, _id) => {
  console.log("fetch:", { url, _id });
  try {
    const response = await axios.get(`${url}/${_id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.data.success) {
      toast.success(response.data?.data?.blogDetails?.title || "success");
    } else {
      toast.error("Something went wrong");
    }
    console.log({ data: response.data });
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Something went wrong";
    console.error("Error fetching blog data:", message);
  }
};

const getUserBlog = async (url, formData, token) => {
  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data?.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
 
    }
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    console.error(message);

    return false;
  }
};




const changePublish = async (url, formData,token) => {
  try {
    const response = await axios.put(url, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data?.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    console.error(message);
    toast.error(message);
    return false;
  }
};


const postDelete = async (url, formData, token) => {
  console.log({ 
    url,
    formData,
    token
  })
   try {
    const response = await axios.delete(url,  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data:formData
    });

    if (response.data?.success) {
      toast.success(response.data.message);
      return response.data.data;
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";
    console.error(message);
    toast.error(message);
    return false;
  }
};

const getComment = async (url, token) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (data) {

      console.log("Message:", data.message);

      return data?.message; // assuming data contains a `data` field with the actual comment list
    } else {
      toast.error("Something went wrong");
      return false;
    }

  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Something went wrong";

    console.error("Error fetching comments:", message);
    return false;
  }
};

const putStatus = async (url,status, token) => {
  try {
    const { data } = await axios.put(url, status, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (data) {

      console.log("Message:", data);

      return data?.message; // assuming data contains a `data` field with the actual comment list
    } else {
      toast.error("Something went wrong");
      return false;
    }

  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Something went wrong";

    console.error("Error fetching comments:", message);
    return false;
  }
};

const deleteComment = async (url, commentID, token) => {
  try {
    const { data } = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { commentID } // Make sure it's an object if your backend expects it this way
    });

    if (data) {
      console.log("Message:", data.message); // Log just the message, cleaner
      return data.message;
    } else {
      toast.error("Something went wrong");
      return false;
    }
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Something went wrong";
    console.error("Delete error:", message);
    toast.error(message);
    return false;
  }
};


const addComment = async (url, formData, token) => {

  try {
    const { data } = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data?.message) {
      console.log("Message:", data.message);
      return data.message;
    } else {

      return false;
    }
  } catch (error) {
    const message = error?.response?.data?.message || error.message || "Something went wrong";
    console.error("Add comment error:", message);

    return false;
  }
};


const updateBlog = async (url, formData, token) => {
  try {
    const { data } = await axios.put(url, formData, {
      headers: {
        'Content-Type': "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    });

    if (data.success) {
      toast.success('Blog submitted successfully');
      console.log('Blog Data:', data);
      return data;
    } else {
      toast.error('Submission failed');
      return false;
    }
  } catch (error) {
    const message = error?.response?.data?.message?.message || error.message || 'Something went wrong';
    toast.error(message);
    console.error('Error submitting blog:', message);
    return false;
  }
};




export {getData, signUp,logIn, logOut, submitBlog, generateBlog, getBlogData,updateBlog,
  getUserBlog,changePublish,postDelete,getComment,putStatus,deleteComment,addComment
};