import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { BlogWrite } from './pages/BlogWrite'
import { AppBar } from './components/AppBar'
import { useEffect, useState } from 'react'


function App() {
  const [isLoggedin, setIsLoggedin] = useState(!!localStorage.getItem("token")); // Initial state based on token presence
  
  useEffect(() => {
    // Listen for changes to localStorage and update state accordingly
    const handleStorageChange = () => {
      setIsLoggedin(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Run effect only once during component mount
  
  return (
    <>
      <BrowserRouter>

        <AppBar isLoggedin={isLoggedin} />
    
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/post" element={<BlogWrite />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

