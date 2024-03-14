export const BlogSkeleton = () => {
    return (
      <div className="max-w-5xl mx-auto p-8">
        {/* Article Skeleton */}
        <div className="mb-8">
          <div className="h-12 w-full mb-4 bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="flex space-x-4">
            <div className="h-6 w-1/3 mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="flex-grow h-6 bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
          <div className="h-4 w-full mb-4 bg-gray-200 animate-pulse rounded-lg"></div>
          <p className="h-4 text-gray-300 animate-pulse">
            {/* Multiple lines for longer content */}
          </p>
        </div>
  
        {/* Author Skeleton (right-aligned) */}
        <div className="flex items-center justify-end mb-8"> {/* Added justify-end for right alignment */}
          <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full"></div>
          <div className="flex-grow space-x-2 ml-4"> {/* Added ml-4 for margin-left */}
            <div className="h-6 w-2/3 mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="h-4 w-1/2 mb-2 bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 bg-gray-200 h-5 rounded animate-pulse">&nbsp;</p>
        <p className="text-gray-700 mb-4 bg-gray-200 h-5 rounded animate-pulse">&nbsp;</p>
        <p className="text-gray-700 mb-4 bg-gray-200 h-5 rounded animate-pulse">&nbsp;</p>
        <p className="text-gray-700 mb-4 bg-gray-200 h-5 rounded animate-pulse">&nbsp;</p>
        <p className="text-gray-700 mb-4 bg-gray-200 h-5 rounded animate-pulse">&nbsp;</p>
        {/* Additional Text Below Author */}
        <div className="text-gray-300 animate-pulse">
          <p className="h-4">{/* Placeholder text for additional information */}
          </p>
          <p className="h-4">{/* Another line of placeholder text */}
          </p>
          <p className="h-4">{/* Additional text skeleton */}
          </p>
          <p className="h-4">{/* More text skeleton */}
          </p>
        </div>
        
        {/* Additional Skeletons (optional) */}
        {/* You can add more skeleton elements here to represent other content sections */}
      </div>
    );
  };
  
  export default BlogSkeleton;