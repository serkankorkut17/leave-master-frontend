import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ResetPasswordModal from "../components/ResetPasswordModal";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, login, resetPassword } = useAuthContext();
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error(error);
    }
  };

  const forgetPasswordHandler = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <section className="h-full my-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto h-full flex justify-center items-center px-4">
          <div className="relative top-[-50px] bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 md:p-12 w-full max-w-md md:max-w-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-6 md:mb-8">
              Login to your account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 md:mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-200"
                  placeholder="name@mail.com"
                  {...register("email")}
                  required
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="mb-4 md:mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-200"
                  placeholder="Your password"
                  {...register("password")}
                  required
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <button
                    onClick={forgetPasswordHandler}
                    className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-200"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
      {openModal && <ResetPasswordModal setOpenModal={setOpenModal} resetPassword={resetPassword} />}
    </>
  );
};

export default LoginPage;
