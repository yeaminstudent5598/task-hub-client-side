import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { MdDeleteForever, MdReadMore } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // Default: Descending order

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('https://task-hub-server-side.vercel.app/assignments', {
          params: { difficulty, search: searchTerm },
        });

        let sortedAssignments = response.data.sort((a, b) => 
          sortOrder === 'asc' ? a.marks - b.marks : b.marks - a.marks
        );

        setAssignments(sortedAssignments);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [difficulty, searchTerm, sortOrder]);

  return (
    <section className="assignments py-20 bg-gray-50 dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-12">All Assignments</h2>

        {/* Filters: Difficulty, Search, Sorting */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {/* Difficulty Filter */}
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

          {/* Search Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title"
            className="p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg shadow-sm focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
          />

          {/* Sorting Dropdown */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg shadow-sm focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
          >
            <option value="desc">Marks: High to Low</option>
            <option value="asc">Marks: Low to High</option>
          </select>
        </div>

        {/* Assignment List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
          {/* <div className="spinner border-t-4 border-b-4 border-blue-500 dark:border-blue-400 w-12 h-12 rounded-full animate-spin"></div>  */}
        </div>
        ) : assignments.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 italic mt-8">No assignments found matching your criteria.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {assignments.map((assignment) => (
              <div key={assignment._id} className="card bg-white dark:bg-gray-700 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                <img src={assignment.thumbnail} alt="Assignment" className="h-48 object-cover rounded-t-lg" />
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{assignment.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">Difficulty: {assignment.difficulty}</p>
                    <p className="text-gray-600 dark:text-gray-300">Marks: {assignment.marks}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/assignment-details/${assignment._id}`)}
                      className="btn btn-sm bg-[#f5f6fb] shadow-lg text-blue-600 border border-2 border-gray-400 rounded-lg flex justify-center items-center gap-2"
                    >
                      <MdReadMore />
                    </button>
                    {user && user.email === assignment.creatorEmail && (
                      <>
                        <Link to={`/update-assignment/${assignment._id}`} className="block btn btn-sm flex bg-[#f5f6fb] shadow-lg text-blue-600 border border-2 border-gray-400 rounded-lg justify-center items-center gap-2">
                          <FaRegEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(assignment._id)}
                          className="block bg-red-600 btn btn-sm flex text-white py-2 rounded-lg hover:bg-red-700 justify-center items-center gap-2"
                        >
                          <MdDeleteForever />
                        </button>
                      </>
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
