import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/Auth';

import NotAuthenticated from './NotAuthenticated';
import Authenticated from './Authenticated';
import Logout from './Logout';
import SwitchMode from './SwitchMode';

const Sidebar = () => {
   const { user } = useAuthContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
      if (user) {
         setIsAuthenticated(true);
      }
      else {
         setIsAuthenticated(false);
      }
   }, [user]);

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {isAuthenticated ? <Authenticated /> : <NotAuthenticated />}
          {isAuthenticated && <Logout />}
        </ul>
      </div>
      <div className="fixed bottom-0 left-0 w-64 p-3 bg-white dark:bg-gray-800">
        <SwitchMode />
      </div>
    </aside>
  );
};

export default Sidebar;
