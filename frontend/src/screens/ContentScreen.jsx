import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; // Firestore configuration
import { useAuth } from '@/contexts/AuthContext'; // For authentication
import LoadingSpinner from '@/component/LoadingSpinner';
import PDFReader from '@/component/PDFReader'; // PDF reader component

const ContentScreen = () => {
  const { currentUser } = useAuth(); // Get the authenticated user
  const { id: courseId } = useParams(); // Get the courseId from the URL
  const [course, setCourse] = useState(null); // Store course details
  const [topics, setTopics] = useState([]); // Store topics
  const [loading, setLoading] = useState(true); // Loading state
  const [openedTopic, setOpenedTopic] = useState(null); // Track which topic's PDF is open
  const [hasPurchasedCourse, setHasPurchasedCourse] = useState(false); // Check if the user purchased the course
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    const checkPurchaseAndFetchCourse = async () => {
      if (!currentUser) {
        console.error("User is not authenticated");
        navigate('/login'); // Redirect to login if user is not authenticated
        return;
      }

      try {
        // Fetch course details
        const courseDocRef = doc(db, 'courses', courseId);
        const courseDoc = await getDoc(courseDocRef);

        if (courseDoc.exists()) {
          setCourse(courseDoc.data());

          // Fetch the topics subcollection
          const topicsCollectionRef = collection(courseDocRef, 'topics');
          const topicsSnapshot = await getDocs(topicsCollectionRef);
          const topicsList = topicsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setTopics(topicsList);

          // Check if the user has purchased the course
          const purchasesRef = collection(db, `users/${currentUser.uid}/purchases`);
          const q = query(purchasesRef, where("courseId", "==", courseId));
          const purchaseSnapshot = await getDocs(q);

          if (!purchaseSnapshot.empty) {
            setHasPurchasedCourse(true);
          }
        } else {
          console.log("No such course found!");
          navigate('/resources'); // Redirect if the course doesn't exist
        }
      } catch (error) {
        console.error("Error fetching course details or topics:", error);
      } finally {
        setLoading(false);
      }
    };

    checkPurchaseAndFetchCourse();
  }, [courseId, currentUser, navigate]);

  // Function to toggle the PDF view
  const togglePDFView = (topic) => {
    // Check if the user has purchased the course
    if (hasPurchasedCourse) {
      setOpenedTopic(openedTopic === topic.contentURL ? null : topic.contentURL); // Toggle between open/close
    } else {
      alert("You need to purchase this course to view the content.");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!course) {
    return <div className="text-white text-center">Course not found.</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white py-8">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Course Details */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <div className="space-y-2">
            <p className="text-lg">{course.description}</p>
            <div className="flex flex-col md:flex-row md:space-x-8 text-sm text-gray-400">
              <p><strong>Category:</strong> {course.category}</p>
              <p><strong>Type:</strong> {course.type}</p>
            </div>
          </div>
        </div>

        {/* Topics List */}
        <div>
          <h2 className="text-3xl font-semibold mb-6">Topics</h2>
          {topics.length > 0 ? (
            <ul className="space-y-4">
              {topics.map((topic) => (
                <li key={topic.id} className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold text-white mb-2">{topic.title}</h3>
                  <p className="text-sm text-gray-400 mb-4"><strong>Order:</strong> {topic.order}</p>
                  <button
                    onClick={() => togglePDFView(topic)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                  >
                    {openedTopic === topic.contentURL ? "Close PDF" : "View Topic"}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No topics found for this course.</p>
          )}
        </div>

        {/* PDF Reader for the selected topic, spanning almost full width */}
        {openedTopic && (
          <div className="mt-8 w-full">
            <h2 className="text-2xl font-semibold mb-4">Viewing Topic</h2>
            <div className="w-full h-[80vh] bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <PDFReader contentURL={openedTopic} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentScreen;
