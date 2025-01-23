import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { motion } from 'framer-motion';

const PendingAssignments = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [isMarkModalOpen, setIsMarkModalOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  // Fetch assignments and filter pending ones
  useEffect(() => {
    const fetchAttemptedAssignments = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await axios.get('https://task-hub-server-side.vercel.app/submittedAssignments', {
          withCredentials: true,
        });
        
        const fetchedAssignments = Array.isArray(response.data) ? response.data : [];
        setAssignments(fetchedAssignments);

        // Filter pending assignments
        const pendingAssignments = fetchedAssignments.filter(
          (assignment) => assignment?.status?.trim().toLowerCase() === 'pending'
        );
        setPendings(pendingAssignments);
      } catch (error) {
        console.error('Error fetching attempted assignments:', error);
      } finally {
        setIsLoading(false); // End loading
      }
    };  

    if (user?.email) {
      fetchAttemptedAssignments();
    }
  }, [user]);

  // Handle submitting marks for an assignment
  const handleSubmitMarks = async (obtainedMarks, feedback) => {
    // Validate obtainedMarks: it must be between 0 and 100
    if (obtainedMarks < 0 || obtainedMarks > 100 || isNaN(obtainedMarks)) {
      Swal.fire('Error', 'Marks must be between 0 and 100!', 'error');
      return;
    }
  
    // Validate feedback: it must not be empty
    if (!feedback.trim()) {
      Swal.fire('Error', 'Feedback cannot be empty!', 'error');
      return;
    }
  
    try {
      const response = await axios.put(
        `https://task-hub-server-side.vercel.app/mark-update/${currentAssignment._id}`,
        {
          obtainedMarks,
          feedback,
          status: 'completed',
          title: currentAssignment.title,
          marks: currentAssignment.marks,
        }
      );
  
      console.log(response);
  
      if (response.status === 200) {
        Swal.fire('Success', 'Marks submitted successfully!', 'success');
        setAssignments(assignments.filter((assignment) => assignment._id !== currentAssignment._id));
        setPendings(pendings.filter((assignment) => assignment._id !== currentAssignment._id));
        setIsMarkModalOpen(false);
      } else {
        Swal.fire('Error', 'Failed to submit marks.', 'error');
      }
    } catch (error) {
      console.error('Error submitting marks:', error);
      Swal.fire('Error', 'An error occurred while submitting marks.', 'error');
    }
  };
  

  return (
    <section className="pending-assignments py-16 bg-gray-50 dark:bg-gray-800 dark:text-white">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Pending Assignments
      </h2>
  
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="spinner border-t-4 border-b-4 border-blue-500 dark:border-blue-400 w-12 h-12 rounded-full animate-spin"></div>
        </div>
      ) : (
        <motion.div
          className="overflow-x-auto shadow-lg rounded-lg bg-white dark:bg-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <table className="table w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 dark:bg-blue-900 text-gray-700 dark:text-white">
                <th className="px-4 py-3 border-b">Title</th>
                <th className="px-4 py-3 border-b">Marks</th>
                <th className="px-4 py-3 border-b">Examinee</th>
                <th className="px-4 py-3 border-b">Status</th>
                <th className="px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendings.length > 0 ? (
                pendings.map((assignment) => (
                  <motion.tr
                    key={assignment._id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-600"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-4 py-3 border-b dark:border-gray-600">{assignment.title}</td>
                    <td className="px-4 py-3 border-b dark:border-gray-600">{assignment.marks}</td>
                    <td className="px-4 py-3 border-b dark:border-gray-600">{assignment.displayName}</td>
                    <td className="px-4 py-3 border-b dark:border-gray-600">{assignment.status}</td>
                    <td className="px-4 py-3 border-b dark:border-gray-600">
                      <button
                        onClick={() => {
                          if (user?.email === assignment.userEmail) {
                            Swal.fire({
                              icon: 'error',
                              title: 'Action Not Allowed',
                              text: 'You cannot mark your own submission.',
                            });
                          } else {
                            setCurrentAssignment(assignment);
                            setIsMarkModalOpen(true);
                          }
                        }} 
                        className="btn btn-primary btn-sm dark:bg-blue-600 dark:hover:bg-blue-700"
                      >
                        Give Mark
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-600 dark:text-gray-400"
                  >
                    No pending assignments
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      )}
  
      {isMarkModalOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-700 dark:text-white p-8 rounded-lg shadow-xl w-full max-w-md"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Mark Assignment
            </h3>
            {currentAssignment && (
              <div className="mb-6">
                <p>
                  <strong>Google Docs Link:</strong>{' '}
                  <a
                    href={currentAssignment.googleDocsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 dark:text-blue-400 underline"
                  >
                    Open Google Docs
                  </a>
                </p>
                <p className="mt-2">
                  <strong>Notes:</strong> {currentAssignment.notes}
                </p>
              </div>
            )}
            <form>
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="Enter marks"
                  className="input input-bordered w-full dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  id="marks"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Enter feedback"
                  className="textarea textarea-bordered w-full dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  id="feedback"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() =>
                    handleSubmitMarks(
                      document.getElementById('marks').value,
                      document.getElementById('feedback').value
                    )
                  }
                  className="btn btn-success btn-sm dark:bg-green-600 dark:hover:bg-green-700"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setIsMarkModalOpen(false)}
                  className="btn btn-error btn-sm dark:bg-red-600 dark:hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  </section>
  
  
  );
};

export default PendingAssignments;
