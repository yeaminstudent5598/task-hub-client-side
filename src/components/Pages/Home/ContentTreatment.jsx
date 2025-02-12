import React from "react";
import { motion } from "framer-motion";  // Import Framer Motion
import { Link } from "react-router-dom";

const tools = [
  {
    name: "Attendance",
    
    img: "https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/dynamic-textbooks/1_Attendance.png",
  },
  {
    name: "Polls & Quizzes",
   
    img: "https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/dynamic-textbooks/2_Polls_Quizzes.png",
  },
  {
    name: "Discussions",
   
    img: "https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/dynamic-textbooks/3_Discussions.png",
  },
  {
    name: "Dynamic eTexts",
   
    img: "https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/dynamic-textbooks/4_Dynanic_Textbooks.png",
  },
  {
    name: "Personalizable Content",
    
    img: "https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/dynamic-textbooks/5_Personalizable_Content.png",
  },
  {
    name: "Assignments & Exams",
    
    img: "https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/dynamic-textbooks/6_Assignments_Exams.png",
    textColor: "text-purple-700 font-bold",
  },
  {
    name: "Real-time Data",
    
    img: "https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/dynamic-textbooks/7_Learning_Insights.png",
  },
  {
    name: "Interactive Labs",
    
    img: "https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/dynamic-textbooks/8_Interactive_Labs.png",
  },
];

const ContentTreatment = () => {
  return (
    <div className="container  mx-auto p-10 text-center bg-gradient-to-b from-white to-purple-100 min-h-screen flex flex-col items-center">
      <motion.h3
        className="text-4xl font-semibold text-purple-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <em>Tools</em> for teaching, learning, and engaging.
      </motion.h3>
      <motion.p
        className="text-gray-700 mt-4 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        Assignments and exams are just two of the many ways Top Hat enables professors to teach with engaging content,
        tools, and activities in online, hybrid, or face-to-face classrooms.
      </motion.p>
      <motion.div
        className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {tools.map((tool, index) => (
          <motion.a
            key={index}
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-2 hover:shadow-lg transition duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 * index, type: "spring", stiffness: 100 }}
          >
            <img src={tool.img} alt={`${tool.name} logo`} className="w-16 h-16" />
            <p className={`mt-2 text-lg ${tool.textColor ? tool.textColor : "text-gray-800"}`}>{tool.name}</p>
          </motion.a>
        ))}
      </motion.div>
      <motion.div
        className="mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Link to='assignments'><a className="btn btn-outline btn-primary text-lg px-6 py-3">
          View All Features
        </a></Link>
      </motion.div>
    </div>
  );
};

export default ContentTreatment;
