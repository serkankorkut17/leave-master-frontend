import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Loading from "../components/Loading";
import { set } from "date-fns";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  employeeRole: Yup.string()
    .required()
    .oneOf(
      ["analyst","frontend", "backend", "fullstack", "tester", "designer"],
      "Invalid Employee Role"
    ),
  startDate: Yup.date().required(),
  password: Yup.string().required(),
  repeatPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, signup } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    // console.log(data);
    setIsLoading(true);
    try {
      await signup(
        data.firstName,
        data.lastName,
        data.email,
        data.employeeRole,
        data.startDate,
        data.password,
        data.repeatPassword
      );
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      {isLoading && <Loading />}
      <section className="h-full mt-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto h-full flex justify-center items-center px-4">
          <div className="relative bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-4 md:p-8 w-full max-w-md md:max-w-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-6 md:mb-8">
              Register a New Account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 md:mb-6">
                <label
                  htmlFor="first-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-200"
                  placeholder="John"
                  {...register("firstName")}
                  required
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="mb-4 md:mb-6">
                <label
                  htmlFor="last-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-200"
                  placeholder="Doe"
                  {...register("lastName")}
                  required
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
              <div className="mb-4 md:mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-200"
                  placeholder="user@mail.com"
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
                  htmlFor="employee-role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Employee Type
                </label>
                <select
                  id="employee-type"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-200"
                  {...register("employeeRole")}
                  required
                >
                  {/* add analtyst also tester */}
                  <option value="analyst">Analyst</option>
                  <option value="frontend">Frontend Developer</option>
                  <option value="backend">Backend Developer</option>
                  <option value="fullstack">Fullstack Developer</option>
                  <option value="tester">Tester</option>
                  <option value="designer">Designer</option>
                </select>
                {errors.employeeRole && (
                  <span className="text-red-500 text-sm">
                    {errors.employeeRole.message}
                  </span>
                )}
              </div>
              <div className="mb-4 md:mb-6">
                <label
                  htmlFor="start-date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="start-date"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-200"
                  {...register("startDate")}
                  required
                />
                {errors.startDate && (
                  <span className="text-red-500 text-sm">
                    {errors.startDate.message}
                  </span>
                )}
              </div>
              <div className="mb-4 md:mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Your Password
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
                  htmlFor="repeat-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Repeat Password
                </label>
                <input
                  type="password"
                  id="repeat-password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-200"
                  {...register("repeatPassword")}
                  required
                />
                {errors.repeatPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.repeatPassword.message}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-200"
              >
                Register New Account
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
