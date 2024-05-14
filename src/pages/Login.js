import React, { useEffect } from 'react';
import { useAuthContext } from '../context/Auth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, login } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const loginHandler = () => {
    login('serkan');
    navigate('/');
    navigate(0)
  };
  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-20">Login Page</h1>
      <button className="" onClick={loginHandler}>
        Login
      </button>
    </>
  );
};

export default LoginPage;
