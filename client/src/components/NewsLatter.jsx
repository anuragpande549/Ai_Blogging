import React from 'react'

function NewsLatter() {
const handleSubmit = (e) => {
    e.preventDefault();
    
    alert('Thank you for subscribing!');
};

return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8 mt-10 flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 text-center">Never Miss a Blog</h1>
        <p className="text-gray-600 mb-6 text-center">
            Subscribe to get the latest blog, new tech, and exclusive news.
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-3">
            <input
                type="email"
                placeholder="Enter your email id"
                required
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-blue-700 transition"
            >
                Subscribe
            </button>
        </form>
    </div>
);
}

export default NewsLatter