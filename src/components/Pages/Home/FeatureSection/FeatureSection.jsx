import React from "react";
import { Link } from "react-router-dom";

const FeatureSection = () => {
  const features = [
    {
      title: "Collaborate with Friends",
      description:
        "Easily connect with all registered users and collaborate on group assignments seamlessly.",
      icon: "🤝",
    },
    {
      title: "Create Assignments",
      description:
        "Create new assignments, share them with friends, and keep track of progress.",
      icon: "📝",
    },
    {
      title: "Submit & Grade",
      description:
        "Submit your completed assignments and grade your friends’ work efficiently.",
      icon: "✅",
    },
    {
      title: "Real-Time Notifications",
      description:
        "Stay updated with assignment deadlines and activity notifications.",
      icon: "⏰",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Track group performance and progress with a comprehensive dashboard.",
      icon: "📊",
    },
    {
      title: "Cross-Platform Support",
      description:
        "Access TaskHub on any device and manage group assignments anywhere, anytime.",
      icon: "📱",
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-primary">
          Why Choose TaskHub?
        </h2>
        <p className="text-lg text-neutral mb-8">
          Simplify group-study assignments with these amazing features designed
          to boost collaboration and productivity!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card shadow-md hover:shadow-lg transition p-6 bg-base-200"
            >
              <div className="text-5xl mb-4 text-primary">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-neutral">{feature.description}</p>
            </div>
          ))}
        </div>
        <Link to={'/register'} className="btn btn-primary mt-8">Start Your Journey Now</Link>
      </div>
    </section>
  );
};

export default FeatureSection;
