import { AppBar } from "../components/AppBar";
import BlogCard from "../components/BlogCard"

export const Blogs = () => {
    return (
        <>
        <AppBar/>
        <div className="max-w-2xl mx-auto my-8 px-4 md:px-0">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                {/* <button className="rounded-full border border-gray-700 px-4 py-2 mb-2 md:mb-0">For you</button>
                <button className="rounded-full border border-gray-700 px-4 py-2">Following</button> */}
            </div>
            <div className="space-y-6">
                {/* <BlogCard /> */}
            </div>
        </div>
        </>
    );
};