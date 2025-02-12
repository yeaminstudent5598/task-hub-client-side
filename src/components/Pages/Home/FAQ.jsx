import React, { useState } from "react";

const faqs = [
  {
    question: "How do you assign homework in Top Hat?",
    answer:
      "There are a variety of options to create homework assignments for students in Top Hat. You can find detailed instructions in ",
    link: {
      text: "this Support Center article.",
    },
  },
  {
    question: "Does Top Hat automatically grade?",
    answer:
      "Yes, Top Hat offers the ability to add auto-graded questions to a homework or review assignment, as well as assessments. Learn more about assignment grading in ",
    link: {
      text: "this Support Center article.",
    },
  },
  {
    question: "How do you get students to turn in assignments?",
    answer:
      "How students submit their assignments depends on how they are assigned. Content can be assigned as homework (graded) or for review (non-graded). When students complete homework assignments, their responses will be auto-graded (in the case of most question types) or require manual grading (in the case of discussions or long answer questions), and the gradebook will automatically be populated. Content that has been assigned to your students as review will NOT be graded. When students respond to items assigned as review, their submissions will not be recorded.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container  mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl dark:text-gray-200 font-bold text-center text-purple-900 mb-6">
        Frequently Asked <em>Questions</em>
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="collapse dark:bg-gray-950 dark:text-gray-200 collapse-arrow bg-white shadow-md rounded-lg border border-gray-200">
            <input type="checkbox" checked={openIndex === index} onChange={() => toggleFAQ(index)} />
            <div className="collapse-title flex justify-between items-center text-lg font-medium cursor-pointer p-4">
              {faq.question}
              <img
                src="https://tophat.com/wp-content/themes/TOPHAT01/build/images/triangle-arrow-purple.svg"
                alt="arrow"
                className={`w-4 h-4 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
              />
            </div>
            <div className="collapse-content dark:text-gray-200 p-4 text-gray-700">
              <p>
                {faq.answer}
                {faq.link && (
                  <a
                    href={faq.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {faq.link.text}
                  </a>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
