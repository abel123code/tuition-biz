import React, { useState, useEffect } from 'react';
import { db } from '@/firebaseConfig'; // Your Firebase config file
import { collection, query, where, getDocs } from 'firebase/firestore';
import CourseCard from '@/component/CourseCard';
import LoadingSpinner from '@/component/LoadingSpinner';

const Courses = ({ courseType = "slides" }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesRef = collection(db, "courses");
                const q = query(coursesRef, where("type", "==", courseType));
                const querySnapshot = await getDocs(q);
                const coursesList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                setCourses(coursesList);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [courseType]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8">Available {courseType === "slides" ? "Slides" : "Flashcards"}</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {courses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Courses;
