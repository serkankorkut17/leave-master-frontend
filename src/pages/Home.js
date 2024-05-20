import React, { useEffect } from 'react';
import { useAuthContext } from '../context/Auth';
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { user,isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }
  , [isLoggedIn, navigate]);

  return (
    <div className="container mx-auto mt-16">
      <h1 className="text-4xl font-bold text-center">Home Page</h1>
      <p className="text-center mt-5">Welcome to the Home Page</p>
    </div>
  );
}

export default HomePage;
