import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthProvider/AuthProvider';

const MyAttemptedAssignments = () => {
  const { user } = useContext(AuthContext); // Get logged-in user info
  const [assignments, setAssignments] = useState([]);
 console.log(assignments); 
 useEffect(() => {
    const fetchAttemptedAssignments = async () => {
      try {
        const response = await axios.get(`https://task-hub-server-side.vercel.app/submissions?email=${user.email}`, { withCredentials: true})
        setAssignments(response.data);

      } catch (error) {
        console.error('Error fetching attempted assignments:', error);
      }
    };

    if (user?.email) {
      fetchAttemptedAssignments();
    }
  }, [user]);

  if (!user) {
    return <p>You need to log in to view your attempted assignments.</p>;
  }

  return (
    <div className="my-attempted-assignments p-6 bg-white dark:bg-gray-800">
  <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">My Attempted Assignments</h1>
  {assignments.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-300 w-full text-left dark:border-gray-600">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="border border-gray-300 px-4 py-2 text-gray-900 dark:text-white">Title</th>
            <th className="border border-gray-300 px-4 py-2 text-gray-900 dark:text-white">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-gray-900 dark:text-white">Total Marks</th>
            <th className="border border-gray-300 px-4 py-2 text-gray-900 dark:text-white">Obtained Marks</th>
            <th className="border border-gray-300 px-4 py-2 text-gray-900 dark:text-white">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment._id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="border border-gray-300 px-4 py-2 text-gray-900 dark:text-white">
                {assignment.title || 'N/A'}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-gray-900 dark:text-white">
                {assignment.status}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-gray-900 dark:text-white">
                {assignment.marks || 'N/A'}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-gray-900 dark:text-white">
                {assignment.obtainedMarks !== undefined
                  ? assignment.obtainedMarks
                  : 'Not Graded'}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-gray-900 dark:text-white">
                {assignment.feedback || 'No Feedback'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-gray-600 dark:text-gray-400">No assignments submitted yet.</p>
  )}
</div>


  );
};

export default MyAttemptedAssignments;
