import { useState } from 'react';

export const AppBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white px-4 py-2 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* <img
            alt="Logo"
            className="h-10 w-10"
            height="40"
            src="/placeholder.svg"
            style={{
              aspectRatio: "40/40",
              objectFit: "cover",
            }}
            width="40"
          /> */}
          <h1 className="text-xl font-semibold">Medium</h1>
        </div>
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
          <a className="text-sm font-medium hover:text-gray-700" href="#">
            Write
          </a>
          <a className="text-sm font-medium hover:text-gray-700" href="#">
            Sign in
          </a>
          <button className="bg-green-600 text-white text-sm px-4 py-2 rounded-full hover:bg-green-700">
            Get started
          </button>
        </nav>
      </div>
    </header>
  );
};
