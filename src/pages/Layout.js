import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({children}) => {
  return (
    <>
      <Navigation />
      <Sidebar />
      <main className="h-screen overflow-auto sm:ml-64 dark:bg-gray-900 mb-4">
        <Outlet />
        <ToastContainer />
      </main>
      <Footer />
    </>
  );
};

export default Layout;