import { useNavigate } from "react-router-dom";

const HomePage = ({isLoggedIn} : {isLoggedIn : boolean}) => {

    const navigate = useNavigate();
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-black mb-6 animate-bounce">
            Welcome to Your Blogging Platform
          </h1>
          <p className="text-xl text-black mb-8 animate-pulse">
            Discover, share, and engage with captivating stories.
          </p>
          <div className="flex justify-center space-x-4 animate-bounce">
            {isLoggedIn ? null : <button onClick={() => {navigate('/signin')}} className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors duration-300">
              Get Started
            </button >}
            <button onClick={() => {
                !isLoggedIn ? navigate('/signin') : navigate('/blogs')
            }} className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors duration-300">
              Explore Blogs
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default HomePage;