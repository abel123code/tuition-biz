import React, { useState, useEffect } from 'react';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext'; // Import the Auth context
import CourseCard from '@/component/CourseCard';
import LoadingSpinner from '@/component/LoadingSpinner';

const MyResources = () => {
    const { currentUser } = useAuth(); // Get the current user from AuthContext
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            if (currentUser) {
                try {
                    //console.log('uuid used: ', currentUser.uid);
                    const purchasesRef = collection(db, `users/${currentUser.uid}/purchases`);
                    const q = query(purchasesRef, where("isCompleted", "==", true));
                    const querySnapshot = await getDocs(q);

                    const purchasedResources = await Promise.all(querySnapshot.docs.map(async purchaseDoc => {
                        const data = purchaseDoc.data();
                        const courseDocRef = doc(db, "courses", data.courseId);
                        const courseDoc = await getDoc(courseDocRef);
                        return { id: courseDoc.id, ...courseDoc.data() };
                    }));
                    
                    setResources(purchasedResources);
                } catch (error) {
                    console.error("Error fetching resources:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false); // Stop loading if no user is logged in
            }
        };

        fetchResources();
    }, [currentUser]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!currentUser) {
        return <div>Please log in to view your resources.</div>;
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8">My Resources</h1>
                {resources.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {resources.map(resource => (
                            <CourseCard key={resource.id} course={resource} isPurchased={true} />
                        ))}
                    </div>
                ) : (
                    <p>You haven’t purchased any resources yet.</p>
                )}
            </div>
        </div>
    );
}

export default MyResources;
