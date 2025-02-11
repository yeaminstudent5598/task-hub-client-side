import React from "react";

const ActionableData = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Video Section */}
        <div className="lg:w-1/2">
          <video
            className="w-full rounded-lg shadow-lg"
            autoPlay
            loop
            muted
            playsInline
            id="actionable-data-video"
          >
            <source
              src="https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/dynamic-textbooks/tophat-discussion-r2B.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Text Section */}
        <div className="lg:w-1/2">
          <h3 className="text-3xl font-bold text-gray-900">
            <em className="text-purple-600">Actionable data</em> for evolving teaching.
          </h3>

          {/* Checklist */}
          <ul className="mt-6 space-y-6">
            {[
              {
                img: "https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/final-checklist-icons/Numeric_Purple_1.png",
                text: "Every interaction in Top Hat leads to actionable data you can use to help students and personalize your teaching."
              },
              {
                img: "https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/final-checklist-icons/Numeric_Purple_2.png",
                text: "Capture results from graded discussions in the Top Hat gradebook, along with quizzes, polls, and tests."
              },
              {
                img: "https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/final-checklist-icons/Numeric_Purple_3.png",
                text: "See how your students are responding to material in class and out, so you know who needs extra support."
              },
              {
                img: "https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/final-checklist-icons/Numeric_Purple_4.png",
                text: "Easily integrate with LMS platforms like Blackboard, Canvas, D2L, Moodle, and Sakai."
              }
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <img className="w-12" src={item.img} alt={`Checklist icon ${index + 1}`} />
                <p className="text-gray-700">{item.text}</p>
              </li>
            ))}
          </ul>

          {/* Email Form */}
          <div className="mt-6">
            <form className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <div className="relative flex-1">
                <input
                  className="w-full py-3 pl-10 pr-4 bg-white text-gray-900 outline-none"
                  type="email"
                  placeholder="Enter your email address here"
                  required
                />
                <img
                  className="absolute left-3 top-3 w-6"
                  src="https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/icons/email.svg"
                  alt="Email icon"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-900 text-white py-3 px-6 hover:bg-gray-700 transition"
              >
                Get Started
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionableData;
