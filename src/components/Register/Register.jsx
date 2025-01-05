import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../AuthProvider/AuthProvider";
import auth from "../../Firebaseinit/Firebase.init";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUpperCase) {
      toast.error("Password must have at least one uppercase letter.");
      return false;
    }
    if (!hasLowerCase) {
      toast.error("Password must have at least one lowercase letter.");
      return false;
    }
    if (!isLongEnough) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!validatePassword(password)) {
      return;
    }

    try {
      // Call register function from AuthProvider
      await register(email, password)
      toast.success("Registration successful!");
      navigate("/"); // Redirect to login page after successful registration
    } catch (error) {
      toast.error(`Registration Error: ${error.message}`);
    }
  };

  const handleGoogleLogin = async () => {
    try {
        await signInWithPopup(auth, provider)
        toast.success('Successfully logged in with Google!');
        navigate('/');
    } catch (error) {
        toast.error(error.message);
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-100 dark:bg-gray-900">
  <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
    <h2 className="text-2xl font-bold text-center mb-6 text-emerald-600 dark:text-emerald-400">
      Create an Account
    </h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-1"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
        />
      </div>
      <div>
        <label
          htmlFor="photoURL"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Photo URL
        </label>
        <input
          type="url"
          name="photoURL"
          id="photoURL"
          value={formData.photoURL}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Must contain at least one uppercase, one lowercase letter, and be at least 6 characters long.
        </p>
      </div>
      <button
        type="submit"
        className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 dark:hover:bg-emerald-500 transition duration-300"
      >
        Register
      </button>
    </form>
    <div className="mt-4 text-center">
      <p className="text-sm text-gray-600 dark:text-gray-400">Or login with</p>
      <button
        onClick={handleGoogleLogin}
        className="w-full px-4 py-2 mt-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 dark:focus:ring-red-800"
      >
        Google
      </button>
    </div>
    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
      Already have an account?{" "}
      <Link to="/login" className="text-emerald-600 hover:underline dark:text-emerald-400">
        Login here
      </Link>
    </p>
  </div>
</div>

  );
};

export default Register;
