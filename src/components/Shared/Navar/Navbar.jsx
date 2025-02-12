import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { FaMoon, FaSun } from "react-icons/fa";

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
        `m-4 dark:text-white text-black hover:text-yellow-300 transition duration-300 ${
          isPending
            ? "pending"
            : isActive
            ? "text-black border-b-2 border-yellow-300"
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
        `m-4 dark:text-white text-black hover:text-yellow-300 transition duration-300 ${
          isPending
            ? "pending"
            : isActive
            ? "text-black border-b-2 border-yellow-300"
            : ""
        }`
      }
    >
      Assignments
    </NavLink>,
    user && (
      <>
        <NavLink
          key="Pending Assignments"
          to="/pending-assignments"
          className={({ isActive, isPending }) =>
            `m-4 dark:text-white text-black hover:text-yellow-300 transition duration-300 ${
              isPending
                ? "pending"
                : isActive
                ? "text-black border-b-2 border-yellow-300"
                : ""
            }`
          }
        >
          Pending Assignments
        </NavLink>
        <NavLink
          key="create-assignment"
          to="/create-assignment"
          className={({ isActive, isPending }) =>
            `m-4 dark:text-white text-black hover:text-yellow-300 transition duration-300 ${
              isPending
                ? "pending"
                : isActive
                ? "text-black border-b-2 border-yellow-300"
                : ""
            }`
          }
        >
          <li>Create Assignment</li>
        </NavLink>
      </>
    ),
    <NavLink
      key="Rules"
      to="/rules"
      className={({ isActive, isPending }) =>
        `m-4 dark:text-white text-black hover:text-yellow-300 transition duration-300 ${
          isPending
            ? "pending"
            : isActive
            ? "text-black border-b-2 border-yellow-300"
            : ""
        }`
      }
    >
      Rules
    </NavLink>,
  ];
  
 
  

  return (
    <div
    className="navbar items-center w-full py-0 px-10 z-20  fixed border-gray-200 bg-white text-black dark:bg-gray-950 shadow-md"

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
          {/* <Link to={"/"}>
            <img
              className="h-10 w-10"
              src="https://i.ibb.co.com/njb3JBc/DALL-E-2024-12-22-15-52-03-A-modern-and-creative-logo-design-for-an-online-group-study-platform-name.png"
              alt=""
            />
          </Link> */}
          <Link to={"/"} className="text-2xl font-bold tracking-wide cursor-pointer">
            <span className="text-black dark:text-white">Task Hub</span>
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
            className="theme-controller "
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
         {theme === "light" ? <FaMoon className=" mr-4  h-6 w-6"/> :  
          <FaSun className=" text-white mr-4 h-6 w-6 fill-current" />}

          {/* Moon icon */}
          <div className="">
          
          </div>
        </label>
        {!user ? (
          <Link
            to="/login"
            className="btn btn-outline dark:text-white text-black  hover:bg-black"
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
  className="menu dark:bg-gray-950 dropdown-content bg-white border border-gray-200 rounded-xl shadow-xl z-[20] mt-3 w-64 p-4 space-y-3 transition-all duration-300"
>
  {/* User Display Name */}
  <li className="border-b pb-3 text-center">
    <p className="text-base font-semibold text-gray-800 dark:text-white">
      {user?.displayName || "Anonymous"}
    </p>
  </li>

  {/* Menu Items */}
  

  <li>
    <Link
      to="/my-attempted-assignments"
      className="block text-gray-800 dark:text-white hover:bg-gray-100 px-3 py-2 rounded-lg transition duration-200"
    >
      My Attempted Assignments
    </Link>
  </li>

  {/* Logout Button */}
  <li className="pt-2">
    <button
      onClick={handleLogout}
      className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition duration-300"
    >
      Logout
    </button>
  </li>
</ul>

</div>
           
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
