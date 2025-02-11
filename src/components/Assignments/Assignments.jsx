import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { GrUpdate } from 'react-icons/gr';
import { MdDeleteForever } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('https://task-hub-server-side.vercel.app/assignments', {
          params: { difficulty, search: searchTerm },
        });
        setAssignments(response.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [difficulty, searchTerm]);

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
        Swal.fire("Error!", "An error occurred while deleting the assignment.", "error");
      }
    }
  };

  return (
    <section className="assignments py-16 bg-gray-50 dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-12">All Assignments</h2>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg shadow-sm focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title"
            className="p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg shadow-sm focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="w-[400px] md:w-[350px] bg-slate-300/20 px-6 py-4 mx-auto rounded-2xl space-y-6 shadow-md animate-pulse">
                <div className="w-full h-[190px] bg-gray-400 rounded-2xl"></div>
                <div className="space-y-2">
                  <div className="h-6 w-2/3 rounded bg-gray-300"></div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-4 w-4 rounded bg-gray-300"></div>
                    ))}
                  </div>
                </div>
                <div className="mt-5 flex justify-between items-center font-medium">
                  <div className="h-6 w-1/4 rounded bg-gray-300"></div>
                  <div className="h-10 w-24 bg-gray-700 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        ) : assignments.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 italic mt-8">No assignments found matching your criteria.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {assignments.map((assignment) => (
              <div key={assignment._id} className="card bg-white dark:bg-gray-700 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                <img src={assignment.thumbnail} alt="Assignment" className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{assignment.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">Difficulty: {assignment.difficulty}</p>
                  <p className="text-gray-600 dark:text-gray-300">Marks: {assignment.marks}</p>
                  <div className='flex justify-between'>
                  <button
                    onClick={() => navigate(`/assignment-details/${assignment._id}`)}
                    className="btn bg-[#f5f6fb]  shadow-lg mt-4 text-blue-600 border border-2 border-gray-400 py-2 rounded-lg  dark:hover:bg-blue-600"
                  >
                    <TbListDetails />
                    View
                  </button>
                  {user && user.email === assignment.creatorEmail && (
                    <div className="mt-4 flex ">
                      <Link to={`/update-assignment/${assignment._id}`} className="block mr-2 bg-yellow-400 text-white flex  btn py-4 rounded-lg text-center hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600"><GrUpdate />Update</Link>
                      <button onClick={() => handleDelete(assignment._id)} className="block bg-red-600 btn flex text-white py-2 rounded-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"><MdDeleteForever />Delete</button>
                    </div>
                  )}
                  </div>
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
