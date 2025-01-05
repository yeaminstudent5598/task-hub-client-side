import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UpdateAssignment = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    marks: "",
    difficulty: "easy",
    dueDate: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(`https://task-hub-server-side.vercel.app/assignments/${id}`);
        const data = response.data;
        setFormData({
          title: data.title || "",
          marks: data.marks || "",
          difficulty: data.difficulty || "easy",
          dueDate: data.dueDate || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching assignment:", error);
        toast.error("Failed to load assignment data.");
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const { title, marks, difficulty, dueDate } = formData;

    if (!title.trim() || title.length < 5 || title.length > 100) {
      toast.error("Title must be between 5 and 100 characters.");
      return;
    }
    if (!marks || marks <= 0) {
      toast.error("Marks must be greater than 0.");
      return;
    }
    if (!difficulty) {
      toast.error("Difficulty is required.");
      return;
    }
    // if (!dueDate || new Date(dueDate) <= new Date()) {
    //   toast.error("Due date must be a future date.");
    //   return;
    // }

    try {
      const response = await axios.put(`https://task-hub-server-side.vercel.app/assignments/${id}`, formData);
      if (response.status === 200) {
        Swal.fire("Success!", "Assignment updated successfully!", "success");
        navigate("/assignments");
      }
    } catch (error) {
      console.error("Error updating assignment:", error);
      toast.error("Error updating assignment.");
    }
  };

  return (
    <section
      className="update-assignment py-16"
      style={{
        backgroundImage: "url('https://i.ibb.co/qrFDB09/DALL-E-2024-12-23-10-36-46-A-sleek-and-modern-side-banner-for-an-Update-Assignment-form-The-design-f.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto">
        {!loading ? (
          <form onSubmit={handleSubmit} className="p-6 rounded-lg max-w-lg mx-auto backdrop-blur">
            <h2 className="text-2xl font-bold text-center mb-6 text-primary">Update Assignment</h2>

            <div className="form-control mb-4">
              <label htmlFor="title" className="label">
                <span className="label-text">Assignment Title</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input placeholder-black input-bordered w-full bg-white/20 backdrop-blur"
                placeholder="Enter assignment title"
              />
            </div>

            <div className="form-control mb-4">
              <label htmlFor="marks" className="label">
                <span className="label-text">Marks</span>
              </label>
              <input
                type="number"
                id="marks"
                name="marks"
                value={formData.marks}
                onChange={handleChange}
                required
                className="input placeholder-black input-bordered w-full bg-white/20 backdrop-blur"
                placeholder="Enter marks"
              />
            </div>

            <div className="form-control mb-4">
              <label htmlFor="difficulty" className="label">
                <span className="label-text">Difficulty Level</span>
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
                className="input select select-bordered placeholder-black input-bordered w-full bg-white/20 backdrop-blur"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="form-control mb-6">
              <label htmlFor="dueDate" className="label">
                <span className="label-text">Due Date</span>
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
                className="input placeholder-black input-bordered w-full bg-white/20 backdrop-blur"
              />
            </div>

            <div className="form-control">
              <button type="submit" className="btn btn-primary w-full">
                Update Assignment
              </button>
            </div>
          </form>
        ) : (
          <p>Loading assignment data...</p>
        )}
      </div>
    </section>
  );
};

export default UpdateAssignment;
