import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-20 bg-[#2d1259]
        dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-600 p-10 dark:text-white rounded-t-lg shadow-2xl">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* TaskHub Info Section */}
        <div className='text-white'>
          <h6 className="footer-title text-xl font-bold text-white">TaskHub</h6>
          <p className="mt-2 text-sm opacity-80">
            Your ultimate platform for managing assignments, tasks, and collaborative projects efficiently.
          </p>
          <p className="mt-4 text-sm">
            &copy; 2024 TaskHub. All rights reserved.
          </p>
        </div>

        {/* Services Section */}
        <div className='text-white'>
          <h6 className="footer-title text-lg font-bold text-white">Services</h6>
          <ul className="mt-2 space-y-2">
            <li><a className="link link-hover text-sm">Task Management</a></li>
            <li><a className="link link-hover text-sm">Assignment Collaboration</a></li>
            <li><a className="link link-hover text-sm">Grading System</a></li>
            <li><a className="link link-hover text-sm">Progress Tracking</a></li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className='text-white'>
          <h6 className="footer-title text-lg font-bold text-white">Quick Links</h6>
          <ul className="mt-2 space-y-2">
            <li><a className="link link-hover text-sm">About Us</a></li>
            <li><a className="link link-hover text-sm">Contact Support</a></li>
            <li><a className="link  link-hover text-sm">Blog</a></li>
            <li><a className="link link-hover text-sm">FAQs</a></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h6 className="footer-title text-lg font-bold text-white">Follow Us</h6>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-blue-500 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-white">
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-pink-500 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-white">
                <path
                  d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-yellow-500 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-white">
                <path
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
