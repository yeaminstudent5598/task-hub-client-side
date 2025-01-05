import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [difficulty, setDifficulty] = useState(''); // To hold the selected difficulty level
  const [searchTerm, setSearchTerm] = useState(''); // For search input
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch assignments with filters
  const fetchAssignments = async () => {
    try {
      const response = await axios.get('https://task-hub-server-side.vercel.app/assignments', {
        params: {
          difficulty,
          search: searchTerm,
        },
      });
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  useEffect(() => {
    fetchAssignments(); // Fetch all assignments when component mounts
  }, [difficulty, searchTerm]); // Re-fetch when filter or search term changes

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`https://task-hub-server-side.vercel.app/assignments/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          Swal.fire("Deleted!", "Assignment has been deleted.", "success");
          setAssignments(assignments.filter((assignment) => assignment._id !== id));
        } else {
          Swal.fire("Error!", "Failed to delete the assignment.", "error");
        }
      } catch (error) {
        console.error("Error deleting assignment:", error);
        Swal.fire("Error!", "An error occurred while deleting the assignment.", "error");
      }
    }
  };

  const handleUpdateClick = (id) => {
    navigate(`https://task-hub-server-side.vercel.app/update-assignment/${id}`);
  };

  const handleViewClick = (id) => {
    navigate(`/assignment-details/${id}`);
  };

  return (
    <section className="assignments dark:bg-gray-800 dark:text-white py-16 bg-gray-50">
  <div className="container mx-auto px-6 lg:px-12">
    <h2 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-12">
      All Assignments
    </h2>

    {/* Filter and Search Inputs */}
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
      >
        <option value="" className="dark:text-gray-300">Select Difficulty</option>
        <option value="easy" className="dark:text-gray-300">Easy</option>
        <option value="medium" className="dark:text-gray-300">Medium</option>
        <option value="hard" className="dark:text-gray-300">Hard</option>
      </select>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by title"
        className="p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
      />
    </div>

    {assignments.length === 0 ? (
      <p className="text-center text-gray-500 dark:text-gray-400 italic mt-8">
        No assignments found matching your criteria.
      </p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {assignments.map((assignment) => (
          <div
            key={assignment._id}
            className="card bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={assignment.thumbnail}
              alt="Assignment Thumbnail"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                {assignment.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                Difficulty: {assignment.difficulty}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Marks: {assignment.marks}
              </p>

              <button
                onClick={() => handleViewClick(assignment._id)}
                className="btn btn-primary w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                View Assignment
              </button>

              {user && (
                <>
                  {user.email === assignment.creatorEmail ? (
                    <div className="mt-4 space-y-2">
                      <Link
                        to={`/update-assignment/${assignment._id}`}
                        className="block bg-yellow-400 text-white py-2 rounded-lg text-center hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(assignment._id)}
                        className="block bg-red-600 text-white py-2 rounded-lg w-full hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm mt-2 italic text-gray-500 dark:text-gray-400">
                      You cannot delete this assignment.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</section>

  
  );
};

export default Assignments;
