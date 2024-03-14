
import BlogCard from "../components/BlogCard"
import { BlogCardSkeleton } from "../components/BlogCardSkeleton";
import { ServerError } from "../components/ServerError";
import { useBlogs } from "../hooks";

export const Blogs = () => {

    const {loading, blogs, error} = useBlogs();
    if(loading){
         return <>
         <BlogCardSkeleton></BlogCardSkeleton>
         <BlogCardSkeleton></BlogCardSkeleton>
         <BlogCardSkeleton></BlogCardSkeleton>
         </>
    }

    if (error || !blogs) {
        // Redirect to unauthorized page or handle error
        // if (error) {
            
        // }
        return <ServerError errorContent="something went wrong"></ServerError>// Or render an error message
    }

    return (
        <>
       
        <div className="max-w-2xl mx-auto my-8 px-4 md:px-0">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                {/* <button className="rounded-full border border-gray-700 px-4 py-2 mb-2 md:mb-0">For you</button>
                <button className="rounded-full border border-gray-700 px-4 py-2">Following</button> */}
            </div>
            <div className="space-y-6">
                {blogs.map(blog => <BlogCard 
                id = {blog.id}
                authorName = {blog.author.name} 
                title={blog.title}
                content={blog.content}
                publishedDate={blog.createdAt}/>)}
            </div>
        </div>
        </>
    );
};