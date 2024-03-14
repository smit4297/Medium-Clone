

export const BlogCardSkeleton = () => {
  return (
    <div className="max-w-2xl mx-auto my-8 px-4 md:px-0">
    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        {/* <button className="rounded-full border border-gray-700 px-4 py-2 mb-2 md:mb-0">For you</button>
        <button className="rounded-full border border-gray-700 px-4 py-2">Following</button> */}
    </div>
    <div className="space-y-6">
      <article className="border-b border-gray-200 pb-6 mx-4 md:mx-auto">
        {/* Article Skeleton */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-2">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <div className="h-8 w-8 flex items-center justify-center bg-gray-300 text-gray-700 font-semibold rounded-full animate-pulse">
             
            </div>
            <div className="flex-grow">
              <div className="h-6 bg-gray-200 animate-pulse rounded-lg"></div>
              <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          </div>
          <div className="h-6 w-6 animate-pulse rounded-lg bg-gray-200"></div> {/* SVG placeholder */}
        </header>

        <h2 className="text-xl font-bold mb-2 h-8 bg-gray-200 animate-pulse rounded-lg"></h2>
        <p className="text-gray-700 mb-4 h-6 bg-gray-200 animate-pulse rounded-lg"></p>

        <footer className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-gray-600">
            <div className="h-4 w-4 animate-pulse rounded-lg bg-gray-200"></div> {/* SVG placeholder */}
            <span className="h-4 bg-gray-200 animate-pulse rounded-lg"></span> {/* Placeholder for delimiter */}
            <span className="h-4 bg-gray-200 animate-pulse rounded-lg"></span> {/* Placeholder for read time */}
          </div>
          <div className="h-6 w-6 animate-pulse rounded-lg bg-gray-200"></div> {/* SVG placeholder */}
        </footer>
      </article>
      </div>
        </div>
  );
};

