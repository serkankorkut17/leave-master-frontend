import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 py-6 sm:ml-64">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          © 2024{' '}
          <a href="https://localhost:3000.com/" className="hover:underline font-semibold">
            Leave Master™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-4 md:mt-0 text-sm text-gray-600 dark:text-gray-400">
          <li className="me-4 md:me-6">
            <a href="#" className="hover:underline">
              About
            </a>
          </li>
          <li className="me-4 md:me-6">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li className="me-4 md:me-6">
            <a href="#" className="hover:underline">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
