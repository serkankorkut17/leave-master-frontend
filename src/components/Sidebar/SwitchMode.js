import React, { useState, useEffect } from 'react';

const SwitchMode = () => {
  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, []);

  const clickHandler = () => {
    document.getElementsByTagName('html')[0].classList.toggle('dark');
    // save
    const html = document.getElementsByTagName('html')[0];
    const darkMode = html.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('darkMode', darkMode);
  };

  return (
    <ul className="space-y-2 font-medium">
      <li>
        <button
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          onClick={clickHandler}
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.509 5.75c0-1.493.394-2.96 1.144-4.25h-.081a8.5 8.5 0 1 0 7.356 12.746A8.5 8.5 0 0 1 8.509 5.75Z"
            />
          </svg>
          <span className="flex-1 ml-3 whitespace-nowrap">Switch Mode</span>
        </button>
      </li>
    </ul>
  );
};

export default SwitchMode;
