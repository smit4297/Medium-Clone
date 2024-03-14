import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Blog {
  content: string;
  title: string;
  author: {
    name: string;
  };
  published: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/get/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          setBlog(response.data.blog);
        } else if (response.status === 401) {
          setError("Unauthorized access. Please sign in again."); // Specific error for 401
        } else {
          setError("Something went wrong. Please try again later.");
        }

        setLoading(false);
      } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response && e.response.data && e.response.data.msg) {
              // If the backend responds with a message
              setError(e.response.data.msg);
            } else {
              // Handle other types of errors
              setError("Error while fetching data");
            }
          }else{
            setError("Something went wrong. Please try again later.");
          }

          setLoading(false)
      }
    };

    fetchBlog();
  }, [id]);

  if (error) {
    // Return something went wrong page (or handle differently based on error)
    return {
      loading: false,
      blog: null,
      error,
    };
  }

  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          setBlogs(response.data.blogs);
        } else {
          setError("Something went wrong. Please try again later.");
        }
        setLoading(false);
      } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response && e.response.data && e.response.data.msg) {
              // If the backend responds with a message
              setError(e.response.data.msg);
            } else {
              // Handle other types of errors
              setError("Error while fetching data");
            }
          }else{
            setError("Something went wrong. Please try again later.");
          }

          setLoading(false)
      }
    };

    fetchBlogs();
  }, []);

  if (error) {
    // Return something went wrong page (or handle differently based on error)
    return {
      loading: false,
      blogs: null,
      error,
    };
  }

  return {
    loading,
    blogs,
  };
};
