import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpInput, SignInInput } from "@69.code.dev/medium-common";
import axios from "axios";
import { BACKEND_URL } from '../env';


export const Auth = ({ type, onTokenChange }: { type: "signup" | "signin",  onTokenChange: (isLoggedIn: boolean) => void }) => {
  const navigate = useNavigate();
  type AuthInputType = SignUpInput | SignInInput;
  const [postInputs, setPostInputs] = useState<AuthInputType>(
    type === "signup"
      ? {
          name: "",
          email: "",
          password: "",
        }
      : {
          email: "",
          password: "",
        }
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true); // Set loading state before sending request
    await sendRequest(); // Send login request
    setIsLoading(false); // Reset loading state after request
  };

  
  const [error, setError] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let errorMsg = ""
    if ("name" in postInputs && !postInputs.name) {
         errorMsg = "Name is required\n";
    }
    else if (!postInputs.email) {
      errorMsg = errorMsg += "email is required\n";
    }
    else if (!postInputs.password) {
      errorMsg = errorMsg += "password is required";
  }

    setError(errorMsg);
    if (errorMsg.length === 0) {
      handleClick();
    }
  };

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
  
      if (response.status === 200) {
        // Assuming the backend responds with status 200 upon success
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        onTokenChange(true);
        navigate("/blogs");
      } else {
        // Handle unexpected response status codes
        setError("Unexpected response from the server");
      }
    } catch (e) {
      console.log(e)
      if (axios.isAxiosError(e)) {
        if (e.response && e.response.data && e.response.data.msg) {
          // If the backend responds with a message
          setError(e.response.data.msg);
        } else {
          // Handle other types of errors
          setError("Error while signing up");
        }
      }else{
        setError("Error while signing up");
      }
      
    }
  }
  
  return (

    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {" "}
          {type === "signin" ? "Log In" : "Create an account"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {type === "signin"
            ? "Don't have an account?"
            : "Already have an account?"}
          <Link
            className="font-medium text-indigo-600 hover:text-indigo-500"
            to={type === "signin" ? "/signup" : "/signin"}
          >
            {type === "signin" ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md text-black">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
          <div  className="space-y-6" >
            <div>
              {type === "signup" ? (
                <LabelledInput
                  label="Name"
                  placeholder="Smit Patel..."
                  onChange={(e) => {
                    setPostInputs({
                      ...postInputs,
                      name: e.target.value,
                    });
                  }}
                />
              ) : null}
            </div>
            <div>
              <LabelledInput
                label="Email"
                placeholder="smit@gmail.com"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <LabelledInput
                label="Password"
                type={"password"}
                placeholder="123456"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              

              {/* <button
                onClick={handleClick}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isLoading ? 'animate-spin' : ''
                }`}
                type="submit"
              >
                {type === "signup" ? "Sign up" : "Sign in"}
              </button> */}
              <form onSubmit={handleSubmit}>
             <button
               
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isLoading ? 'h-8 shrink' : ''
                }`}
                type="submit"
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
                      {type === "signup" ? "Sign up" : "Sign in"}
                    </>
                  )}
                </span>
              </button>
              </form>

            </div>
          </div>
          <br></br>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </div>
      </div>
      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <blockquote className="text-center">
            <p className="text-lg font-medium text-gray-900">
              “The customer service I received was exceptional. The support team
              went above and beyond to address my concerns.”
            </p>
            <footer className="mt-4">
              <p className="text-base font-semibold text-gray-700">
                Jules Winnfield
              </p>
              <p className="text-sm text-gray-500">CEO, Acme Inc</p>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        <input
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={onChange}
          type={type || "text"}
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}
