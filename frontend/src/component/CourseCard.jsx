// src/components/CourseCard.js
import React from 'react';

const CourseCard = ({ course }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <img src={course.image} alt={course.title} className="h-40 w-full object-cover rounded-t-lg" />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-black text-left">{course.title}</h3>
                <p className="text-gray-600 text-left">{course.category}</p>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-500">{course.price}</span>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Learn more</button>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
