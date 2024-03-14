import BlogCard from "../components/BlogCard";
import { BlogCardSkeleton } from "../components/BlogCardSkeleton";
import { ServerError } from "../components/ServerError";
import { Unauthorized } from "../components/Unauthorized";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs, error } = useBlogs();

  if (loading) {
    return (
      <>
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
      </>
    );
  }
  if(error === "unauthorized"){
    return <Unauthorized></Unauthorized>
   }

  if (error) {
    // Render ServerError component with the error message
    return <ServerError errorContent={error} />;
  }

  if (!blogs) {
    // Handle the case where blogs are empty (optional)
    return <div>No blogs found.</div>;
  }

  return (
    <>
      <div className="max-w-2xl mx-auto my-8 px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          {/* ... your buttons ... */}
        </div>
        <div className="space-y-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id} // Add key prop for better performance
              id={blog.id}
              authorName={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishedDate={blog.createdAt}
            />
          ))}
        </div>
      </div>
    </>
  );
};
