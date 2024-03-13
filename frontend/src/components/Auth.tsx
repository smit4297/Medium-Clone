import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpInput, SignInInput } from "@69.code.dev/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ServerError } from "./ServerError";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignUpInput | SignInInput>(
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
  const [error, setError] = useState<string>("");
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
        navigate("/blogs");
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
          setError("Error while signing up");
          <ServerError errorContent={error}></ServerError>
        }
      }else{
        setError("Error while signing up");
        <ServerError errorContent={error}></ServerError>
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
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
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
              <button
                onClick={sendRequest}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                {type === "signup" ? "Sign up" : "Sign in"}
              </button>
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
