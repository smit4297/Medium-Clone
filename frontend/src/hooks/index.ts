import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

interface Blog{
    content: string,
            title: string,
            author: {
                name: string
            },
            published: boolean,
            authorId: string,
            createdAt:string,
            updatedAt:string,
            id : string
}

export const useBlog = ({id} : {id : string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/get/${id}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setBlog(response.data.blog);
                setLoading(false);
            } catch (error) {
                setError("Something went wrong. Please try again later.");
                setLoading(false);
            }
        };

        fetchBlog();

    }, [id]);

    if (error) {
        // Return something went wrong page
        return {
            loading: false,
            blog: null,
            error: error
        };
    }

    return {
        loading,
        blog
    };
};
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState<string | null>(null);

    try{
        useEffect( () => {
            axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,
            {headers: {
                Authorization : "Bearer " + localStorage.getItem("token")
            }}).then(reponse => {
                setBlogs(reponse.data.blogs)
                setLoading(false)
            })
        }, [])
    }catch(e){
        setError("Something went wrong. Please try again later.");
        setLoading(false);
    }
    if (error) {
        // Return something went wrong page
        return {
            loading: false,
            blogs: null,
            error: error
        };
    }

    return {
        loading,
        blogs
    };
    
}