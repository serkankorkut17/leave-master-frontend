import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/Auth";

const validationSchema = Yup.object().shape({
  password: Yup.string().required(),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const ResetPasswordPage = () => {
  const { resetPassword } = useAuthContext();
  const { token, email } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    const decodedToken = decodeURIComponent(token);
    const decodedEmail = decodeURIComponent(email);
    try {
      await resetPassword(decodedToken, decodedEmail, data.password, data.confirmPassword);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="h-full my-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto h-full flex justify-center items-center px-4">
          <div className="relative top-[-50px] bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 md:p-12 w-full max-w-md md:max-w-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-6 md:mb-8">
              Reset your password
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 md:mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  New password
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-200"
                  {...register("password")}
                  required
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="mb-4 md:mb-6">
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Confirm password
                </label>
                <input
                  type="confirm-password"
                  id="confirm-password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-200"
                  {...register("confirmPassword")}
                  required
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-200"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPasswordPage;
