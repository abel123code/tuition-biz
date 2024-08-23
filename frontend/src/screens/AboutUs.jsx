import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid';
import demo from '../assets/aboutUsDemo.png'
import { useAnimate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function AboutUs() {
    const navigate = useNavigate()
    const handleNavigation = () => {
        navigate('/')
    }
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-indigo-600">About Us</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Passionate About Education
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                We are a passionate group of tutors who love creating study materials and helping people succeed in their education. Our mission is to empower students by providing them with high-quality learning resources that make studying easier and more effective.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            alt="Our study materials in action"
            src={demo}
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <p>
                Our products are designed with one goal in mind: to help students achieve their full potential. We understand the challenges that students face, and we are committed to providing tools that make learning accessible and enjoyable.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <CloudArrowUpIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Comprehensive Content Notes.</strong> Our notes are meticulously crafted by experienced educators to cover all key concepts, making sure you have all the information you need in one place.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <LockClosedIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Digital Flashcards for Retention.</strong> Our flashcards are designed to reinforce learning through repetition, ensuring that important concepts are retained and easily recalled during exams.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ServerIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Tailored Study Plans.</strong> We provide personalized study plans that adapt to your learning pace, helping you stay organized and focused on your educational journey.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                We believe that education is the foundation for success, and our study materials are crafted to support you every step of the way. Whether you're preparing for a major exam or simply looking to improve your understanding of a subject, we have the resources you need to excel.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Why Choose Our Materials?</h2>
              <p className="mt-6">
                Our materials are more than just tools—they're part of a larger commitment to your success. With our comprehensive content, digital flashcards, and personalized study plans, you can study smarter, not harder. Join thousands of students who trust our materials to help them achieve their academic goals.
              </p>
              <button onClick={handleNavigation} className="mt-6 bg-black text-white rounded-full w-4/5 mx-auto block px-6 py-2 hover:bg-purple-600">
                Back To Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
