import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline'; // Correct import for Heroicons v2

const PricingPage = () => {
  const pricingPlans = [
    {
      name: "Basic",
      price: "$10",
      description: "$8 per month if paid annually",
      features: [
        "Access to 10 content notes",
        "100 digital flashcards (basic level)",
        "Standard analytics",
        "Email support (48-hour response time)"
      ]
    },
    {
      name: "Essential",
      price: "$25",
      description: "$20 per month if paid annually",
      features: [
        "Everything in Basic, plus:",
        "Access to 50 content notes",
        "500 digital flashcards (basic to intermediate)",
        "Advanced analytics",
        "Priority email support (24-hour response time)",
        "Study progress tracking"
      ]
    },
    {
      name: "Advanced",
      price: "$50",
      description: "$40 per month if paid annually",
      features: [
        "Everything in Essential, plus:",
        "Unlimited access to content notes",
        "Unlimited digital flashcards (all levels)",
        "Custom analytics and reporting tools",
        "Dedicated 1-hour support response time",
        "Access to exclusive study webinars",
        "Personalized study plan and coaching sessions"
      ]
    }
  ];

  return (
    <div className="bg-black text-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Choose the Right Plan for You</h2>
        <p className="text-lg mb-12">Select a plan that suits your learning needs and budget.</p>

        <div className="flex flex-col lg:flex-row justify-center space-y-8 lg:space-y-0 lg:space-x-8">
          {pricingPlans.map((plan) => (
            <div key={plan.name} className="bg-white rounded-lg p-8 shadow-lg w-full lg:w-1/3 text-black">
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="text-4xl font-bold mt-4">
                {plan.price}<span className="text-lg font-normal">/month</span>
              </p>
              <p className="text-sm text-gray-700 mt-2">{plan.description}</p>
              <button className="mt-6 bg-purple-500 text-white rounded-full w-4/5 mx-auto block px-6 py-2 hover:bg-purple-600">
                Buy Plan
              </button>
              <ul className="mt-6 space-y-2 text-left">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-800">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" /> {/* Tick icon */}
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
