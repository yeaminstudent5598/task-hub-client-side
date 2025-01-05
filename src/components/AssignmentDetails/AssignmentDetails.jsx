import React, { useEffect, useContext } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";

const AssignmentDetails = () => {
  const { id } = useParams();
  const assignment = useLoaderData();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(`https://task-hub-server-side.vercel.app/assignments/${id}`);
        // console.log("Fetched Assignment:", response.data); // Debug fetched assignment
      } catch (error) {
        console.error("Error fetching assignment details:", error);
      }
    };
    fetchAssignment();
  }, [id]);

  const handleTakeAssignment = () => {
    Swal.fire({
      title: `<h2 class="text-3xl font-bold text-primary">Submit Your Assignment</h2>`,
      html: `
        <div class="flex flex-col gap-4">
          <div>
            <label for="googleDocsLink" class="block text-left text-secondary font-medium mb-2">Google Docs Link</label>
            <input
              type="text"
              id="googleDocsLink"
              class="input input-bordered w-full"
              placeholder="Enter Google Docs link"
            />
          </div>
          <div>
            <label for="quickNote" class="block text-left text-secondary font-medium mb-2">Quick Note</label>
            <textarea
              id="quickNote"
              class="textarea textarea-bordered w-full"
              placeholder="Write a quick note"
              rows="3"
            ></textarea>
          </div>
        </div>
      `,
      customClass: {
        popup: "rounded-xl shadow-lg bg-base-100",
        confirmButton: "btn btn-primary w-full mt-4",
        cancelButton: "btn btn-outline w-full mt-4",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      preConfirm: () => {
        const googleDocsLink = Swal.getPopup().querySelector("#googleDocsLink").value;
        const quickNote = Swal.getPopup().querySelector("#quickNote").value;

        // Validation for Google Docs link and Quick Note
        if (!googleDocsLink || !/^https:\/\/docs\.google\.com\/.+$/.test(googleDocsLink)) {
          Swal.showValidationMessage("Please enter a valid Google Docs link.");
          return false;
        }

        if (!quickNote || quickNote.trim().length < 10) {
          Swal.showValidationMessage("Quick Note must be at least 10 characters long.");
          return false;
        }

        return { googleDocsLink, quickNote };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { googleDocsLink, quickNote } = result.value;

        try {
          const submissionData = {
            assignmentId: id,
            title: assignment.title,
            userEmail: user.email,
            displayName: user.displayName,
            marks: assignment.marks,
            googleDocsLink,
            quickNote,
            status: "pending",
            obtainedMarks: 0,
            feedback: "",
          };

          await axios.post(`https://task-hub-server-side.vercel.app/submissions`, submissionData);

          Swal.fire("Submitted!", "Your assignment has been submitted.", "success");
        } catch (error) {
          console.error("Error submitting assignment:", error);
          Swal.fire("Error!", "Failed to submit the assignment.", "error");
        }
      }
    });
  };

  if (!assignment) return <p>Loading...</p>;

  return (
    <div className="assignment-details max-w-4xl mx-auto p-6 sm:p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-lg">
    <div className="text-center mb-8">
      <h1 className="text-2xl sm:text-4xl font-extrabold mb-4">
        {assignment.title}
      </h1>
      <p className="text-sm sm:text-lg font-light opacity-80">
        Unlock your potential by completing this assignment.
      </p>
    </div>
    {/* Description */}
    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
      <h2 className="text-xl font-semibold mb-2">Description</h2>
      <p className="text-md sm:text-lg font-light text-gray-700 dark:text-gray-300">
        {assignment.description}
      </p>
    </div>
    <div className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white p-6 rounded-md shadow-inner">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Difficulty */}
        <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-800">
          <p className="text-lg font-semibold">Difficulty</p>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-300">
            {assignment.difficulty}
          </p>
        </div>
        {/* Marks */}
        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-800">
          <p className="text-lg font-semibold">Marks</p>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-300">
            {assignment.marks}
          </p>
        </div>
      </div>
      {/* Due Date */}
      <div className="p-4 mt-6 rounded-lg bg-gray-100 dark:bg-gray-700">
        <p className="text-lg font-semibold">Due Date</p>
        <p className="text-xl font-medium text-gray-500 dark:text-gray-300">
          {assignment.dueDate.split("T")[0]}
        </p>
      </div>
    </div>
    {/* Call to Action */}
    <div className="text-center mt-8">
      <button
        className="w-full sm:w-auto px-8 py-3 text-lg font-semibold bg-orange-600 text-white hover:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300 rounded-lg shadow-md transition-all duration-300"
        onClick={handleTakeAssignment}
      >
        Take Assignment
      </button>
    </div>
  </div>
  


  );
};

export default AssignmentDetails;
