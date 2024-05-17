import React from 'react';
import { useAuthContext } from '../context/Auth';

function HomePage() {
  return (
    <div className="container mx-auto mt-16">
      <h1 className="text-4xl font-bold text-center">Home Page</h1>
      <p className="text-center mt-5">Welcome to the Home Page</p>
    </div>
  );
}

export default HomePage;
