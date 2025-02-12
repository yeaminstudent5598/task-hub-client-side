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
    <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-12">
      {/* Image Section */}
      <div className="flex-1">
        <img
          className="w-full max-w-2xl"
          src="https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/assignments/laptop_1.png"
          alt="Laptop with assignments"
        />
      </div>

      {/* Text Section */}
      <div className="flex-1">
        <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">
          <em>Modern </em>assignments for <br className="hidden md:block" />
          today's learners.
        </h3>

        {/* Features List */}
        <ul className="mt-6 space-y-6">
          {[
            {
              imgSrc:
                "https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/final-checklist-icons/Numeric_Pink_1.png",
              text: "Bring content to life with multimedia and interactive questions throughout your assignments for students.",
            },
            {
              imgSrc:
                "https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/final-checklist-icons/Numeric_Pink_2.png",
              text: "Encourage students to show their learning in different ways through a variety of question types—including multiple choice, matching, click-on-target, and long-form answers.",
            },
            {
              imgSrc:
                "https://tophat.com/wp-content/themes/TOPHAT01/build/images/features/final-checklist-icons/Numeric_Pink_3.png",
              text: "Provide hints, multiple attempts, or make correct answers visible to give students immediate feedback so they learn as they go.",
            },
          ].map((item, index) => (
            <li key={index} className="flex items-center gap-4">
              <img className="w-12 h-12" src={item.imgSrc} alt={`Step ${index + 1}`} />
              <p className="text-gray-700 dark:text-gray-300">{item.text}</p>
            </li>
          ))}
        </ul>

        {/* Email Form */}
        <div className="mt-8">
         
        </div>
      </div>
    </div>
  </section>
  
  );
};

export default FAQSection;
