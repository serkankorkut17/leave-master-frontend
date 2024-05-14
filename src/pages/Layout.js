import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import Sidebar from '../components/Sidebar/Sidebar';

const Layout = ({children}) => {
  return (
    <>
      <Navigation />
      <Sidebar />
      <main className="h-screen overflow-auto p-4 sm:ml-64 dark:bg-gray-900">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;