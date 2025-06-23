import React from 'react';

const BlogSkeleton = () => {
  return (
    <div>
      {/* Skeleton Category Filters */}
      <div className="flex justify-center gap-4 sm:gap-8 my-10 flex-wrap">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="h-7 w-20 rounded-full bg-gray-300 animate-pulse" />
        ))}
      </div>

      {/* Skeleton Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="rounded overflow-hidden shadow-md animate-pulse">
            <div className="bg-gray-300 aspect-video" />
            <div className="px-4 py-2">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-300 rounded w-full mb-1" />
              <div className="h-3 bg-gray-300 rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSkeleton;
