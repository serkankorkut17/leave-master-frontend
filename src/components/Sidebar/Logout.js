import React from 'react';
import { useAuthContext } from '../../context/Auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/login');
  };
  return (
    <li>
      <button onClick={logoutHandler} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <svg
          className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
          />
        </svg>
        <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
      </button>
    </li>
  );
};

export default Logout;