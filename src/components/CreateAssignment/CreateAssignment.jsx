import axios from "axios";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../AuthProvider/AuthProvider";

const CreateAssignment = () => {
  const [assignment, setAssignment] = useState({ dueDate: null });
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignment({ ...assignment, [name]: value });
  };

  const handleDateChange = (date) => {
    setAssignment({ ...assignment, dueDate: date });
  };

  const validateForm = () => {
    const { title, description, marks, thumbnail, difficulty, dueDate } = assignment;

    if (!title || title.length < 5) {
      toast.error("Title must be at least 5 characters long.");
      return false;
    }
    if (!description || description.length < 20) {
      toast.error("Description must be at least 20 characters long.");
      return false;
    }
    if (!marks || isNaN(marks) || marks <= 0) {
      toast.error("Marks must be a number greater than 0.");
      return false;
    }
    if (!thumbnail || !thumbnail.match(/^(https?:\/\/[^\s]+)$/)) {
      toast.error("Thumbnail must be a valid URL.");
      return false;
    }
    if (!difficulty) {
      toast.error("Please select a difficulty level.");
      return false;
    }
    if (!dueDate || dueDate < new Date()) {
      toast.error("Due date cannot be in the past.");
      return false;
    }

    // Ensure the user is logged in
    if (!user || !user.email) {
      toast.error("You must be logged in to create an assignment.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!validateForm()) return;

    const { title, description, marks, thumbnail, difficulty, dueDate } = assignment;

    const assignmentData = {
      title,
      description,
      marks,
      thumbnail,
      difficulty,
      dueDate,
      creatorEmail: user.email,
    };

    axios
      .post("https://task-hub-server-side.vercel.app/assignments", assignmentData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        toast.success("Assignment created successfully!");
        // Reset form
        setAssignment({ dueDate: null });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to create the assignment.");
      });
  };

  return (
    <div className="container pt-24 dark:text-white mx-auto py-16">
      <Toaster />
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        Create New Assignment
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-base-200 p-8 rounded shadow-lg"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium mb-2">
            Assignment Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            value={assignment.title || ""}
            className="input  input-bordered w-full"
            placeholder="Enter assignment title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            value={assignment.description || ""}
            className="textarea textarea-bordered w-full"
            placeholder="Enter assignment description"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="marks" className="block text-lg font-medium mb-2">
            Marks
          </label>
          <input
            type="number"
            id="marks"
            name="marks"
            onChange={handleChange}
            value={assignment.marks || ""}
            className="input input-bordered w-full"
            placeholder="Enter marks for this assignment"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="thumbnail" className="block text-lg font-medium mb-2">
            Thumbnail Image URL
          </label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            onChange={handleChange}
            value={assignment.thumbnail || ""}
            className="input input-bordered w-full"
            placeholder="Enter thumbnail image URL"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="difficulty" className="block text-lg font-medium mb-2">
            Difficulty Level
          </label>
          <select
            id="difficulty"
            name="difficulty"
            onChange={handleChange}
            value={assignment.difficulty || ""}
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              Select difficulty
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-lg font-medium mb-2">
            Due Date
          </label>
          <DatePicker
            id="dueDate"
            selected={assignment.dueDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="input input-bordered w-full"
            placeholderText="Select a due date"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Create Assignment
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;
