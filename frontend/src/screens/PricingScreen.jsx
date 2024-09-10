import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { CheckIcon } from '@heroicons/react/24/outline'; // Correct import for Heroicons v2
import { useAuth } from '@/contexts/AuthContext'; // Assuming you have an AuthContext for Firebase authentication
import { getFirestore, doc, getDocs, query, collection } from 'firebase/firestore'; // Firestore imports

const PricingScreen = () => {
  const { currentUser } = useAuth(); // Check if the user is logged in
  const navigate = useNavigate();
  const db = getFirestore();
  const [userPurchases, setUserPurchases] = useState([]);

  //tier 1 for slides
  //tier 2 for flashcards
  //tier 3 for Both

  // Fetch user's purchase data from Firestore
  useEffect(() => {
    const fetchPurchases = async () => {
      if (currentUser) {
        const q = query(
          collection(db, 'users', currentUser.uid, 'purchases') // Fetch purchases from Firestore
        );
        const querySnapshot = await getDocs(q);
        const purchases = querySnapshot.docs.map((doc) => doc.data());
        setUserPurchases(purchases);
      }
    };

    fetchPurchases();
  }, [currentUser, db]);

  // Pricing plans with corresponding Stripe price IDs
  const pricingPlans = [
    {
      name: "Slides",
      price: "$29.99",
      description: "One-time purchase",
      features: [
        "Access to all content notes",
        "Lifetime access to updates",
        "Standard analytics",
        "Email support (48-hour response time)"
      ],
      priceId: "price_1PvBJcIvjYHS1gNW1nQFO65Y", // Replace with your Stripe price ID
      tier: "1", // Tier for slides
      courseId: "kHwiHZ2xjkm03XWoSooo",
      accessType: "slides", // Access type for slides
    },
    {
      name: "All Flashcards",
      price: "$39.99",
      description: "One-time purchase",
      features: [
        "Access to all digital flashcards",
        "Lifetime access to updates",
        "Advanced analytics",
        "Priority email support (24-hour response time)",
        "Study progress tracking"
      ],
      priceId: "price_1PvBL8IvjYHS1gNWdoVq8V3t", // Replace with your Stripe price ID
      tier: "2", // Tier for flashcards
      courseId: "koHQAaqFZhiAULTPw1pq",
      accessType: "flashcards", // Access type for flashcards
    },
    {
      name: "Slides & Flashcards",
      price: "$49.99",
      description: "One-time purchase",
      features: [
        "Access to all content notes and digital flashcards",
        "Lifetime access to updates",
        "Custom analytics and reporting tools",
        "Dedicated 1-hour support response time",
        "Access to exclusive study webinars",
        "Personalized study plan and coaching sessions"
      ],
      priceId: "price_1PvBLmIvjYHS1gNW98VlFS8F", // Replace with your Stripe price ID
      tier: "3", // Tier for both slides and flashcards
      accessType: "both", // To indicate both slides and flashcards
    }
  ];


  // Check if the user has purchased a specific access type (slides or flashcards)
  const hasPurchased = (accessType) => {
    return userPurchases.some((purchase) => purchase.accessType === accessType);
  };

  // Check if the user has purchased both slides and flashcards
  const hasPurchasedBoth = () => {
    return hasPurchased('slides') && hasPurchased('flashcards');
  };

  // Handle the plan purchase
  const handleBuyPlan = (priceId, tier) => {
    if (!currentUser) {
      // If user is not logged in, redirect to login page
      navigate("/login");
    } else {
      // Redirect to the checkout page for the selected plan
      navigate(`/checkout?priceId=${priceId}&tier=${tier}`);
    }
  };

  return (
    <div className="bg-gray-900 text-white py-20 min-h-screen">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Choose the Right Plan for You</h2>
        <p className="text-lg mb-12">Select a plan that suits your learning needs and budget.</p>

        <div className="flex flex-col lg:flex-row justify-center space-y-8 lg:space-y-0 lg:space-x-8">
          {pricingPlans.map((plan) => (
            <div key={plan.name} className="bg-white rounded-lg p-8 shadow-lg w-full lg:w-1/3 text-black">
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="text-4xl font-bold mt-4">
                {plan.price}<span className="text-lg font-normal"> Lifetime</span>
              </p>
              <p className="text-sm text-gray-700 mt-2">{plan.description}</p>

              <button
                onClick={() => handleBuyPlan(plan.priceId, plan.tier)}
                className={`mt-6 ${
                  (plan.accessType === 'both' && hasPurchasedBoth()) ||
                  hasPurchased(plan.accessType)
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-purple-500 hover:bg-purple-600'
                } text-white rounded-full w-4/5 mx-auto block px-6 py-2`}
                disabled={
                  (plan.accessType === 'both' && hasPurchasedBoth()) ||
                  hasPurchased(plan.accessType)
                }
              >
                {(plan.accessType === 'both' && hasPurchasedBoth()) ||
                hasPurchased(plan.accessType)
                  ? 'Purchased'
                  : 'Buy Plan'}
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

export default PricingScreen;
