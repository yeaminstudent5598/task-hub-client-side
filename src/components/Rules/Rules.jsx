import React, { useState } from "react";
import { FaRegCheckCircle, FaRegEdit, FaRegCommentAlt, FaUsers, FaLock } from 'react-icons/fa'; // Icons for each section

const Rules = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const rulesData = [
    {
      title: "User Registration and Login",
      icon: <FaRegCheckCircle className="text-xl" />,
      color: "bg-blue-500",
      content: `
        - Users must register with a valid email address and password.
        - All personal data will be kept confidential and used solely for TaskHub operations.
        - Logging in requires valid credentials, and a session will expire after one hour for security purposes.
      `,
    },
    {
      title: "Assignment Creation",
      icon: <FaRegEdit className="text-xl" />,
      color: "bg-teal-500",
      content: `
        - Registered users can create assignments with the following required details:
          - Title
          - Marks (e.g., 10, 20, 50)
          - Difficulty level (Easy, Medium, Hard)
          - Due Date
        - All assignments must adhere to TaskHub's community guidelines, avoiding offensive or irrelevant content.
      `,
    },
    {
      title: "Submission Rules",
      icon: <FaRegCommentAlt className="text-xl" />,
      color: "bg-purple-500",
      content: `
        - Submissions must include the following:
          - Google Docs link for the completed assignment.
          - A short note about the assignment.
        - Users must submit before the due date to avoid penalties (if applicable).
        - Submitted assignments are marked as "Pending" until reviewed.
      `,
    },
    {
      title: "Feedback and Grading",
      icon: <FaUsers className="text-xl" />,
      color: "bg-yellow-500",
      content: `
        - Assignments can be graded by registered users (peers).
        - Feedback must:
          - Be constructive and polite.
          - Include specific areas of improvement.
          - Avoid offensive or disrespectful language.
        - Grades and feedback will be saved permanently in the system.
      `,
    },
    {
      title: "Community Guidelines",
      icon: <FaUsers className="text-xl" />,
      color: "bg-green-500",
      content: `
        - Be respectful and kind to others while grading or providing feedback.
        - Avoid plagiarism in submissions.
        - Collaborate and help fellow users, maintaining a positive and encouraging environment.
      `,
    },
    {
      title: "Privacy and Security",
      icon: <FaLock className="text-xl" />,
      color: "bg-red-500",
      content: `
        - Sharing sensitive information in assignments, submissions, or feedback is prohibited.
        - Unauthorized access or token tampering will result in account suspension.
      `,
    },
  ];

  return (
    <div className="p-6 pt-24 max-w-4xl mx-auto bg-gradient-to-r from-gray-100 to-gray-300 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg space-y-6">
      <h2 className="text-3xl dark:text-white font-semibold text-center text-gray-800 mb-8">TaskHub Rules</h2>
      {rulesData.map((rule, index) => (
        <div key={index} className="border-t-4 border-transparent hover:border-gray-200 transition-all duration-300 transform hover:scale-105">
          <button
            className={`w-full px-6 dark:bg-gray-900 dark:text-white  py-4 text-left flex items-center justify-between ${rule.color} text-white font-semibold hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-${rule.color.replace('bg-', '')}-400 transition-all duration-300`}
            onClick={() => toggleSection(index)}
          >
            <div className="flex items-center space-x-3">
              {rule.icon}
              <span className="">{rule.title}</span>
            </div>
            <span className="text-lg">{activeSection === index ? '-' : '+'}</span>
          </button>

          {activeSection === index && (
            <div className="mt-3 px-6 py-4 dark:bg-gray-900 dark:text-white  bg-white rounded-lg shadow-md space-y-2 text-sm text-gray-700">
              {rule.content.split("\n").map((line, i) => (
                <p key={i} className="leading-relaxed">{line.trim()}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Rules;
