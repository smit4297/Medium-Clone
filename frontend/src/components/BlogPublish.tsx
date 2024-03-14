import { BlogPostInput } from "@69.code.dev/medium-common";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Unauthorized } from "./Unauthorized";
// import { ServerError } from "./ServerError";

export  function BlogPublish() {

    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<BlogPostInput>(
        {
            title: "",
            content: "",
        }
    );
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let errorMsg = ""
        if (!postInputs.title) {
            errorMsg = `Title is required\n\n`;
        }
        else if (!postInputs.content) {
            errorMsg = errorMsg += `Content is required`;
        }
        setError(errorMsg);
        if (errorMsg.length === 0) {
          handleClick();
        }
      };

    const handleClick = async () => {
        setIsLoading(true); // Set loading state before sending request
        await sendRequest(); // Send login request
        setIsLoading(false); // Reset loading state after request
      };

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
        }
      } catch (e) {
        
        if (axios.isAxiosError(e)) {
          if (e.response && e.response.data && e.response.data.msg) {
            // If the backend responds with a message
            setError(e.response.data.msg);
            
          } else {
            // Handle other types of errors
            setError("Error while publish the Blog");
          }
        }else{
          setError("Error while publish the Blog");
          

        }
      }
    }
    return (

      <div>
      {error === "unauthorized" ? (
        <Unauthorized></Unauthorized>
      )  : <div className="min-h-screen bg-gray-100 p-6 md:flex md:items-center md:justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="flex items-center space-x-4">
          <PlusIcon className="text-gray-400" />
          <input required onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    title: e.target.value,
                  });
                }} className="text-3xl font-bold border-none focus:ring-0 w-full mt-4" placeholder="Title" type="text" />
        </div>
        <textarea required onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    content: e.target.value,
                  });
                }} className="mt-4 h-96 w-full resize-none border-none focus:ring-0" placeholder="Tell your story..." />
        {/* <button  onClick={sendRequest} className="mt-4 w-full md:w-auto bg-black text-white font-bold py-2 px-4 rounded">Publish</button> */}
        
        <br></br>
        {error && <div className="text-red-500 text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
        <button
              className={`mt-4 w-full md:w-auto bg-black text-white font-bold py-2 px-4 rounded ${
                  isLoading ? 'h-8 shrink' : ''
              }`}
              type="submit" // Add type="submit" if it's a form submission button
              disabled={isLoading} // Disable button while loading
              >
              <span className="flex items-center">
              {isLoading ? (
                  <>
                  <span className="animate-ping mr-1 h-2 w-2 rounded-full bg-white"></span>
                  <span className="animate-ping mr-1 h-2 w-2 rounded-full bg-white"></span>
                  <span className="animate-ping h-2 w-2 rounded-full bg-white"></span>
                  </>
              ) : (
                  <>
                  Publish
                  </>
              )}
              </span>
          </button>
          </form>
      </div>
    </div>}
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
  