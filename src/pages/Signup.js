import React, { useEffect } from 'react';
import { useAuthContext } from '../context/Auth';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const { user, login } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
    return (
      <h1 className="text-4xl font-bold text-center mt-20">Signup Page</h1>
    );
  };
  
  export default SignupPage;