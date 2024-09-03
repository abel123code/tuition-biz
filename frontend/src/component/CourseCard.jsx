import React from 'react';

const CourseCard = ({ course }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <img src={course.thumbnail} alt={course.title} className="h-40 w-full object-cover rounded-t-lg" />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-black text-left">{course.title}</h3>
                <p className="text-gray-500 text-left text-sm mb-2">{course.category}</p>
                <p className="text-gray-700 text-left text-sm mb-4">{course.description}</p>
                <div className="flex justify-start">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Learn more</button>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
