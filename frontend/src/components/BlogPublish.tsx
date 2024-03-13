import { BlogPostInput } from "@69.code.dev/medium-common";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { ServerError } from "./ServerError";
import { useNavigate } from "react-router-dom";

export  function BlogPublish() {

    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<BlogPostInput>(
        {
            title: "",
            content: "",
        }
    );
    const [error, setError] = useState<string>("");

    async function sendRequest() {
      try {
        const response = await axios.post(
            `${BACKEND_URL}/api/v1/blog`,
            postInputs,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
          );
          
        if (response.status === 200) {
          // Assuming the backend responds with status 200 upon success
          navigate(`/blog/${response.data.id}`);
        } else {
          // Handle unexpected response status codes
          setError("Unexpected response from the server");
          <ServerError errorContent={error}></ServerError>
        }
      } catch (e) {
        console.log(e)
        if (axios.isAxiosError(e)) {
          if (e.response && e.response.data && e.response.data.msg) {
            // If the backend responds with a message
            setError(e.response.data.msg);
          } else {
            // Handle other types of errors
            setError("Error while publish the Blog");
            <ServerError errorContent={error}></ServerError>

          }
        }else{
          setError("Error while publish the Blog");
          <ServerError errorContent={error}></ServerError>

        }
      }
    }
    
    return (
      <div className="min-h-screen bg-gray-100 p-6 md:flex md:items-center md:justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
          <div className="flex items-center space-x-4">
            <PlusIcon className="text-gray-400" />
            <input onChange={(e) => {
                    setPostInputs({
                      ...postInputs,
                      title: e.target.value,
                    });
                  }} className="text-3xl font-bold border-none focus:ring-0 w-full mt-4" placeholder="Title" type="text" />
          </div>
          <textarea onChange={(e) => {
                    setPostInputs({
                      ...postInputs,
                      content: e.target.value,
                    });
                  }} className="mt-4 h-96 w-full resize-none border-none focus:ring-0" placeholder="Tell your story..." />
          <button  onClick={sendRequest} className="mt-4 w-full md:w-auto bg-black text-white font-bold py-2 px-4 rounded">Publish</button>
        </div>
      </div>
    )
  }

  interface ServerIconProps extends React.SVGProps<SVGSVGElement> {
    // Define any additional props specific to your ServerIcon component
   
  }
  
  function PlusIcon(props : ServerIconProps) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    )
  }
  