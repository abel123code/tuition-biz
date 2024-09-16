import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { CheckIcon } from '@heroicons/react/24/outline'; // Correct import for Heroicons v2
import { useAuth } from '@/contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

const PricingScreen = ({params}) => { 
  const { id } = useParams();
  const { currentUser } = useAuth(); // Check if the user is logged in
  const navigate = useNavigate();
  const db = getFirestore();
  const [userPurchases, setUserPurchases] = useState([]);
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        try {
          // Fetch the course with the given ID
          const courseDoc = await getDoc(doc(db, 'courses', id));
          if (!courseDoc.exists()) {
            console.error('Course not found');
            setLoading(false);
            return;
          }

          const course = courseDoc.data();
          const subjectId = course.subjectId; // e.g., "OlevelPhysics"

          // Fetch all courses with the same subjectId
          const coursesQuery = query(collection(db, 'courses'), where('subjectId', '==', subjectId));
          const coursesSnapshot = await getDocs(coursesQuery);
          const courses = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          // Fetch the combo plan
          const comboDoc = await getDoc(doc(db, 'combos', subjectId));
          const comboData = comboDoc.exists() ? comboDoc.data() : null;

          // Create pricing plans
          const plans = createPricingPlans(courses, comboData);
          console.log(pricingPlans)
          setPricingPlans(plans);

          // Fetch user purchases
          const purchasesQuery = query(collection(db, 'users', currentUser.uid, 'purchases'));
          const purchasesSnapshot = await getDocs(purchasesQuery);
          const purchases = purchasesSnapshot.docs.map(doc => doc.data());
          setUserPurchases(purchases);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [currentUser, db, id]);

  // Check if the user has purchased a specific access type (slides, flashcards, both)
  const hasPurchased = (accessType) => {
    return userPurchases.some((purchase) => purchase.accessType === accessType);
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

  const createPricingPlans = (courses, comboData) => {
    const slideCourse = courses.find(course => course.type === 'slides');
    const flashcardCourse = courses.find(course => course.type === 'flashcards');

    if (!slideCourse || !flashcardCourse) {
      console.error('Missing slide or flashcard course');
      return [];
    }

    const plans = [
      {
        name: `${slideCourse.title}`,
        price: "$29.99",
        description: "One-time purchase",
        features: [
          "Access to all content notes",
          "Lifetime access to updates",
          "Standard analytics",
          "Email support (48-hour response time)"
        ],
        priceId: slideCourse.priceId,
        tier: "1",
        accessType: "slides",
        courseId: slideCourse.id
      },
      {
        name: `${flashcardCourse.title}`,
        price: "$39.99",
        description: "One-time purchase",
        features: [
          "Access to all digital flashcards",
          "Lifetime access to updates",
          "Advanced analytics",
          "Priority email support (24-hour response time)"
        ],
        priceId: flashcardCourse.priceId,
        tier: "2",
        accessType: "flashcards",
        courseId: flashcardCourse.id
      }
    ];

    if (comboData) {
      plans.push({
        name: comboData.title,
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
        priceId: comboData.priceId,
        tier: "3",
        accessType: "both",
        courseId: `${slideCourse.id},${flashcardCourse.id}`
      });
    }

    return plans;
  };

  const isDisabled = (plan) => {
    if (!currentUser) return false; // Not disabled if user is not logged in

    // For combo plans (accessType === 'both')
    if (plan.accessType === 'both') {
      const [slideCourseId, flashcardCourseId] = plan.courseId.split(',');
      
      // Check if user has purchased the combo or both individual courses
      const hasComboPurchase = userPurchases.some(purchase => 
        purchase.courseId === plan.courseId && purchase.accessType === 'both'
      );
      
      const hasIndividualPurchases = userPurchases.some(purchase => 
        purchase.courseId === slideCourseId && purchase.accessType === 'slides'
      ) && userPurchases.some(purchase => 
        purchase.courseId === flashcardCourseId && purchase.accessType === 'flashcards'
      );

      return hasComboPurchase || hasIndividualPurchases;
    }
  
    // Find the purchase that matches the current course ID and access type
    const matchingPurchase = userPurchases.find(purchase => 
      purchase.courseId === plan.courseId && 
      (purchase.accessType === plan.accessType || purchase.accessType === 'both')
    );
  
    // If there's a matching purchase, the plan is disabled (already purchased)
    return !!matchingPurchase;
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
                  isDisabled(plan) ? 'bg-gray-500 cursor-not-allowed' : 'bg-purple-500 hover:bg-purple-600'
                } text-white rounded-full w-4/5 mx-auto block px-6 py-2`}
                disabled={isDisabled(plan)}
              >
                {isDisabled(plan) ? 'Purchased' : 'Buy Plan'}
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
