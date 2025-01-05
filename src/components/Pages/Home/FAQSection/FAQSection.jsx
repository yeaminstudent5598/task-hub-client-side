import React, { useState } from "react";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What is TaskHub?',
      answer:
        'TaskHub is an online platform for group study assignments where users can create, complete, and grade assignments collaboratively with friends.'
    },
    {
      question: 'How do I create an assignment?',
      answer:
        'Once registered, navigate to the "Create Assignment" section, fill in the details, and click on the "Submit" button.'
    },
    {
      question: 'Can I grade my friend’s assignments?',
      answer:
        'Yes, TaskHub allows you to grade your friends’ assignments as part of the collaborative learning experience.'
    },
    {
      question: 'Is TaskHub free to use?',
      answer: 'Yes, TaskHub is completely free for all registered users.'
    },
    {
      question: 'How do I join a study group?',
      answer:
        'By registering on TaskHub, you automatically become a part of the community where every user is considered a friend.'
    }
  ];

  return (
    <section className="py-12 dark:bg-gray-900 dark:text-white bg-gray-100">
    <div className="container mx-auto px-4">
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Frequently Asked Questions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="collapse dark:bg-gray-800 dark:text-white collapse-arrow bg-white rounded-lg shadow-lg"
          >
            <input type="checkbox" className="peer" />
            {/* Question Title */}
            <div className="collapse-title text-lg font-medium text-gray-800 peer-checked:text-primary dark:text-white peer-checked:dark:text-primary">
              {faq.question}
            </div>
            {/* Answer Content */}
            <div className="collapse-content text-gray-600 dark:text-gray-300">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  
  );
};

export default FAQSection;
