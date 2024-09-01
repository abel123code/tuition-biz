import React from 'react';
import CourseCard from '@/component/CourseCard';

const templateCourses = [
    {
        id: 1,
        title: "Measurements",
        category: "O Level Physics",
        image: "https://d1joui61864gj3.cloudfront.net/2220503/md_eu0ahi_de0fe1f89d25293d1b98ef62b32cfd7dc646cb52.jpg",
        price: "$19.99"
    },
    {
        id: 2,
        title: "Kinematics",
        category: "O Level Physics",
        image: "https://d1joui61864gj3.cloudfront.net/2220503/md_eu0ahi_de0fe1f89d25293d1b98ef62b32cfd7dc646cb52.jpg",
        price: "$19.99"
    },
    {
        id: 3,
        title: "Dynamics",
        category: "O Level Physics",
        image: "https://d1joui61864gj3.cloudfront.net/2220503/md_eu0ahi_de0fe1f89d25293d1b98ef62b32cfd7dc646cb52.jpg",
        price: "$19.99"
    },
    {
        id: 4,
        title: "Mass, Weight and Density",
        category: "O Level Physics",
        image: "https://d1joui61864gj3.cloudfront.net/2220503/md_eu0ahi_de0fe1f89d25293d1b98ef62b32cfd7dc646cb52.jpg",
        price: "$19.99"
    },
    {
        id: 5,
        title: "Turning Effect of Forces",
        category: "O Level Physics",
        image: "https://d1joui61864gj3.cloudfront.net/2220503/md_eu0ahi_de0fe1f89d25293d1b98ef62b32cfd7dc646cb52.jpg",
        price: "$19.99"
    },
    {
        id: 6,
        title: "Pressure",
        category: "O Level Physics",
        image: "https://d1joui61864gj3.cloudfront.net/2220503/md_eu0ahi_de0fe1f89d25293d1b98ef62b32cfd7dc646cb52.jpg",
        price: "$19.99"
    },
    {
        id: 7,
        title: "Energy, Work and Power",
        category: "O Level Physics",
        image: "https://d1joui61864gj3.cloudfront.net/2220503/md_eu0ahi_de0fe1f89d25293d1b98ef62b32cfd7dc646cb52.jpg",
        price: "$19.99"
    },
    {
        id: 8,
        title: "Kinetic Model of Matter",
        category: "O Level Physics",
        image: "https://d1joui61864gj3.cloudfront.net/2220503/md_eu0ahi_de0fe1f89d25293d1b98ef62b32cfd7dc646cb52.jpg",
        price: "$19.99"
    },
    {
        id: 9,
        title: "Transfer of Thermal Energy",
        category: "O Level Physics",
        image: "https://d1joui61864gj3.cloudfront.net/2220503/md_eu0ahi_de0fe1f89d25293d1b98ef62b32cfd7dc646cb52.jpg",
        price: "$19.99"
    },
    {
        id: 10,
        title: "Temperature",
        category: "O Level Physics",
        image: "https://d1joui61864gj3.cloudfront.net/2220503/md_eu0ahi_de0fe1f89d25293d1b98ef62b32cfd7dc646cb52.jpg",
        price: "$19.99"
    },
    {
        id: 11,
        title: "Thermal Properties of Matter",
        category: "O Level Physics",
        image: "https://d1joui61864gj3.cloudfront.net/2220503/md_eu0ahi_de0fe1f89d25293d1b98ef62b32cfd7dc646cb52.jpg",
        price: "$19.99"
    },
    {
        id: 12,
        title: "General Wave Properties",
        category: "O Level Physics",
        image: "https://d1joui61864gj3.cloudfront.net/2220503/md_eu0ahi_de0fe1f89d25293d1b98ef62b32cfd7dc646cb52.jpg",
        price: "$19.99"
    }
];


const Courses = () => {
    return (
        <div className="bg-gray-900 min-h-screen text-white py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8">Available Courses</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {templateCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Courses;
