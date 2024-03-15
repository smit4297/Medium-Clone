import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface AppBarProps {
  isLoggedIn: boolean;
  onTokenChange: (isLoggedIn: boolean) => void;
}

const PopoutLayer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg p-4">
      {children}
    </div>
  );
};

export const AppBar = ({ isLoggedIn, onTokenChange }: AppBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopoutOpen, setIsPopoutOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  const handleSignout = () => {
    localStorage.removeItem("token");
    onTokenChange(false);
    navigate("/signin");
  };

  const togglePopout = () => {
    setIsPopoutOpen(!isPopoutOpen);
  };

  return (
    <header className="bg-grey px-4 py-2 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to={"/"}>
          <div className="flex items-center space-x-4">
            {/* <img alt="Logo" className="h-10 w-10" height="40" src="/placeholder.svg" style={{ aspectRatio: "40/40", objectFit: "cover", }} width="40" /> */}
            <h1 className="text-xl font-semibold">Medium</h1>
          </div>
        </Link>
        <nav className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </nav>
        <nav className={`md:flex items-center space-x-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
          {isLoggedIn === true ? (
            <>
              <Link to={'/post'}>
                <a className="text-sm font-medium hover:text-gray-700" href="#">
                  Write
                </a>
              </Link>
              <button
                onClick={togglePopout}
                className="bg-green-600 text-white text-sm px-4 py-2 rounded-full hover:bg-green-700"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to={'/signin'}>
                <a className="text-sm font-medium hover:text-gray-700" href="#">
                  Sign in
                </a>
              </Link>
              <button
                onClick={handleClick}
                className="bg-green-600 text-white text-sm px-4 py-2 rounded-full hover:bg-green-700"
              >
                Sign up
              </button>
            </>
          )}
        </nav>
      </div>
      {isPopoutOpen && (
        <PopoutLayer>
          <div className="flex justify-center">
            <button
              onClick={handleSignout}
              className="bg-red-600 text-white text-sm px-4 py-2 rounded-full hover:bg-red-700"
            >
              Sign out
            </button>
          </div>
        </PopoutLayer>
      )}
    </header>
  );
};