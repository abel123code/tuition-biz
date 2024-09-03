import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

const addCourse = async (courseData) => {
    try {
        const courseRef = collection(db, 'courses');
        await addDoc(courseRef, {
            title: courseData.title,
            type: courseData.type,  // "slides" or "flashcards"
            description: courseData.description,
            contentURLs: courseData.contentURLs, // Array of URLs to PDFs
            thumbnail: courseData.thumbnail, // Thumbnail image URL
            category: courseData.category,
            createdAt: new Date()
        });
        console.log('Course added successfully');
    } catch (error) {
        console.error('Error adding course:', error);
    }
};

// Example Usage:
const newCourse = {
    title: "Physical Quantities Units and Measurements",
    type: "slides",
    description: "Comprehensive slides",
    contentURLs: "https://firebasestorage.googleapis.com/v0/b/tuition-biz.appspot.com/o/courses%2Fslides%2FPhysical-Quantities-Units-and-Measurements.pdf?alt=media&token=2416cbac-b6c4-4170-a066-e88b4439f2f3",
    thumbnail: "https://blogassets.leverageedu.com/blog/wp-content/uploads/2020/07/02185051/Units-and-Measurements.png",
    category: "O Level Physics"
};

addCourse(newCourse);
