import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm text-center sm:text-left">
          © {new Date().getFullYear()} EDUCARDS, Inc. All rights reserved.
        </p>
        <div className="flex justify-center sm:justify-start mt-2 sm:mt-0 space-x-4">
          <a href="https://www.facebook.com" className="text-gray-500 hover:text-gray-900">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com" className="text-gray-500 hover:text-gray-900">
            <FaInstagram />
          </a>
          <a href="https://www.twitter.com" className="text-gray-500 hover:text-gray-900">
            <FaTwitter />
          </a>
          <a href="https://www.github.com" className="text-gray-500 hover:text-gray-900">
            <FaGithub />
          </a>
          <a href="https://www.youtube.com" className="text-gray-500 hover:text-gray-900">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
