import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Navbar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light" // Default to "light"
  );

  const { user, logout } = useContext(AuthContext);

  // Sync theme with DOM and localStorage on initial render
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  // Update theme in DOM and localStorage when `theme` state changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`);
    }
  };

  const Links = [
    <NavLink
      key="home"
      to="/"
      className={({ isActive, isPending }) =>
        `m-4 hover:text-yellow-300 transition duration-300 ${
          isPending
            ? "pending"
            : isActive
            ? "text-white border-b-2 border-yellow-300"
            : ""
        }`
      }
    >
      Home
    </NavLink>,
    <NavLink
      key="Assignments"
      to="/assignments"
      className={({ isActive, isPending }) =>
        `m-4 hover:text-yellow-300 transition duration-300 ${
          isPending
            ? "pending"
            : isActive
            ? "text-white border-b-2 border-yellow-300"
            : ""
        }`
      }
    >
      Assignments
    </NavLink>,
    <NavLink
      key="Pending Assignments"
      to="/pending-assignments"
      className={({ isActive, isPending }) =>
        `m-4 hover:text-yellow-300 transition duration-300 ${
          isPending
            ? "pending"
            : isActive
            ? "text-white border-b-2 border-yellow-300"
            : ""
        }`
      }
    >
      Pending Assignments
    </NavLink>,
    <NavLink
      key="Rules"
      to="/rules"
      className={({ isActive, isPending }) =>
        `m-4 hover:text-yellow-300 transition duration-300 ${
          isPending
            ? "pending"
            : isActive
            ? "text-white border-b-2 border-yellow-300"
            : ""
        }`
      }
    >
      Rules
    </NavLink>,
  ];

  return (
    <div
        className="navbar z-20 bg-gradient-to-tr from-blue-800 via-purple-900 to-gray-900
        dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 text-gray-300 text-white shadow-md"
      >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-emerald-600 text-white rounded-box z-[20] mt-3 w-52 p-2 shadow"
          >
            {Links}
          </ul>
        </div>
        <div className="flex justify-center gap-2">
          <Link to={"/"}>
            <img
              className="h-10 w-10"
              src="https://i.ibb.co.com/njb3JBc/DALL-E-2024-12-22-15-52-03-A-modern-and-creative-logo-design-for-an-online-group-study-platform-name.png"
              alt=""
            />
          </Link>
          <Link to={"/"} className="text-2xl font-bold tracking-wide cursor-pointer">
            <span className="text-yellow-300">Task</span>Hub
          </Link>
        </div>
      </div>
      <div className="navbar-center  hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{Links}</ul>
      </div>
      <div className="navbar-end">
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            className="theme-controller"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          {/* Sun icon */}
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          {/* Moon icon */}
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
        {!user ? (
          <Link
            to="/login"
            className="btn bg-yellow-300 text-emerald-900 hover:bg-yellow-400"
          >
            Login
          </Link>
        ) : (
          <div className="flex items-center space-x-4">
            <div className="dropdown dropdown-end">
  {/* Avatar Button (Always Visible) */}
  <div
    tabIndex={0}
    role="button"
    className="btn btn-ghost btn-circle avatar"
  >
    <div className="w-10 h-10 rounded-full overflow-hidden relative group">
      <img
        alt={user?.displayName || "User"}
        src={user?.photoURL || "https://via.placeholder.com/100"}
        className="object-cover w-full h-full"
      />
      
    </div>
  </div>

  {/* Dropdown Menu (Visible on All Devices) */}
  <ul
    tabIndex={0}
    className="menu dark:bg-gray-900  dropdown-content bg-white border border-gray-200 rounded-lg shadow-lg z-[20] mt-3 w-60 p-4 space-y-4"
  >
    {/* User Display Name */}
    <li className="border-b pb-3">
      <p className="text-sm dark:text-white font-semibold text-gray-800">
        {user?.displayName || "Anonymous"}
      </p>
      
    </li>
    <li className="text-black dark:text-white"> <Link to={'/create-assignment'}>Create Assignments</Link></li>
   <li className="text-black dark:text-white">
    <Link to={'/my-attempted-assignments'}>My Attempted Assignments</Link>
   </li>
  </ul>
</div>
            <button
              onClick={handleLogout}
              className="btn bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
