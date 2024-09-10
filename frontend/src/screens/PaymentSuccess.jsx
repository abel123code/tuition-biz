import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { db } from '@/firebaseConfig'; // Firebase config
import { doc, addDoc, collection } from "firebase/firestore"; // Firestore methods for adding a document
import { useAuth } from '@/contexts/AuthContext'; // Get current user from Firebase Auth

const Success = () => {
  const [searchParams] = useSearchParams();
  const [sessionDetails, setSessionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get("session_id");
  const isUpdatedRef = useRef(false);  // Use ref to track if updates have occurred
  const { currentUser } = useAuth(); // Get the authenticated user

  useEffect(() => {
    console.log('useEffect is running for success component'); 
    const fetchSessionDetails = async () => {
    if (!sessionId || !currentUser) return;

      try {
        // Fetch the checkout session details from the backend
        const response = await fetch(`https://educard-86c06b06f6c2.herokuapp.com//checkout-session?sessionId=${sessionId}`);
        const data = await response.json();
        setSessionDetails(data);
        // If payment is successful, update Firestore with the purchase
        if (data.payment_status === "paid") {
          //await updateUserPurchases(currentUser.uid, data.metadata.tier);
          isUpdatedRef.current = true; // Set ref to true after update
        }
      } catch (error) {
        console.error("Error fetching session details:", error);
      } finally {
        setLoading(false);
      }
    };

    const updateUserPurchases = async (userId, tier) => {
        const purchasesCollectionRef = collection(db, "users", userId, "purchases");
    
        console.log('userId: ', userId);
        console.log('tier: ', tier);
    
        try {
          if (tier === '1') {
            // Add a document for "O Level Physics Slides"
            await addDoc(purchasesCollectionRef, {
              courseId: 'kHwiHZ2xjkm03XWoSooo',
              accessType: 'slides',
              isCompleted: true,
              purchaseDate: new Date(),
            });
          } else if (tier === '2') {
            // Add a document for flashcards
            await addDoc(purchasesCollectionRef, {
              courseId: 'koHQAaqFZhiAULTPw1pq',
              accessType: 'flashcards',
              isCompleted: true,
              purchaseDate: new Date(),
            });
          } else if (tier === '3') {
            // Add two documents, one for "O Level Physics Slides" and one for flashcards
            await addDoc(purchasesCollectionRef, {
              courseId: 'kHwiHZ2xjkm03XWoSooo',
              accessType: 'slides',
              isCompleted: true,
              purchaseDate: new Date(),
            });
            await addDoc(purchasesCollectionRef, {
              courseId: 'koHQAaqFZhiAULTPw1pq',
              accessType: 'flashcards',
              isCompleted: true,
              purchaseDate: new Date(),
            });
          }
        } catch (error) {
          console.error("Error adding purchase:", error);
        }
    };
    

    fetchSessionDetails();
  }, [sessionId, currentUser]);

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-bold mb-4">Processing your payment...</h1>
        <p className="text-lg">Please wait while we verify your payment.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Payment Successful!</h1>
        {sessionDetails && sessionDetails.line_items && sessionDetails.line_items.data.length > 0 ? (
          <>
            <p className="text-lg mb-4">Thank you for your purchase!</p>
            <p className="text-lg mb-4">Product: {sessionDetails.line_items.data[0].description}</p>
            <p className="text-lg">Amount Paid: ${(sessionDetails.amount_total / 100).toFixed(2)}</p>
          </>
        ) : (
          <p className="text-lg">Could not retrieve session details.</p>
        )}
      </div>
    </div>
  );
};

export default Success;
