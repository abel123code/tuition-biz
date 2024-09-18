import React, { useEffect, useState } from 'react';
import { GradualSpacingDemo } from '@/component/GradualSpacingDemo';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; // Adjust the import path for your Firebase config
import DemoContentSection from '@/component/DemoContentSection'

function Dashboard() {
  const slidesPdfUrl = 'https://firebasestorage.googleapis.com/v0/b/tuition-biz.appspot.com/o/courses%2Fslides%2FForces.pdf?alt=media&token=e640406a-0662-408d-9cae-18da691ed897'
  const flashcardsPdfUrl = 'https://firebasestorage.googleapis.com/v0/b/tuition-biz.appspot.com/o/courses%2Fflashcards%2FForces%20flashcard.pdf?alt=media&token=f734a3af-cea6-4ea9-9d76-bc6bff0aa6b4'

  const handleGetStarted = () => {
    navigate('/Slides');
  };

  return (
    <div className="dark bg-gray-900 text-white min-h-screen p-6">
        <div className="pt-16 pb-8 px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Unlock the Future of Learning with EduCard</h1>
          <p className="text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
            Effortlessly boost your learning by accessing digital flashcards and study notes
          </p>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Scroll through our slides to learn about our product, then test your knowledge with our interactive flashcards.
          </p>
        </div>

        <main className="container mx-auto px-4 pb-16">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <DemoContentSection title="Learning Content" type="Slides" pdfUrl={slidesPdfUrl} />
            <DemoContentSection title="Test Your Knowledge" type="Flashcards" pdfUrl={flashcardsPdfUrl} />
          </div>
          <div className="text-center">
            <button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105" onClick={handleGetStarted}>
              Get Started with EduCard
            </button>
          </div>
        </main>
    </div>
  );
}

export default Dashboard;
