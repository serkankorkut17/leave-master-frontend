import React, { useEffect } from "react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { addDays, set } from "date-fns";
import "react-day-picker/src/style.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  getMaxLeaveDaysAPI,
  createLeaveRequestAPI,
} from "../services/LeaveRequestService";
import { useAuthContext } from "../context/Auth";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  reason: Yup.string().required().max(200),
});

const LeaveRequestPage = () => {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const initialRange = {
    // from tomorrow
    from: addDays(new Date(), 1),
    to: addDays(new Date(), 2),
  };

  const [range, setRange] = useState(initialRange);
  const [maxLeaveDays, setMaxLeaveDays] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await createLeaveRequestAPI(
        data.reason,
        range.from,
        range.to
      );
      console.log(response);
      if (response.data == "User already has a leave request") {
        toast.warning("You already have a leave request pending");
      }
      if (response.statusText == "OK") {
        toast.success("Leave request sent successfully");
        navigate("/");
      }
      else if (response.status == 400) {
        toast.error(response.data);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleSelect = (range) => {
    setRange(range);
  };

  useEffect(() => {
    if (!token) return;
    const fetchMaxLeaveDays = async () => {
      const response = await getMaxLeaveDaysAPI();
      // console.log(response.data);
      if (response.data) setMaxLeaveDays(response.data);
    };
    fetchMaxLeaveDays();
  }, [token]);

  return (
    <>
      {isLoading && <Loading />}
      <section className="h-full my-16 bg-gray-100 dark:bg-gray-900">
        {/* add left top available leave days */}
        <div className="top-4 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 text-sm text-gray-900 dark:text-white">
          Available Leave Days: {maxLeaveDays}
        </div>
        <div className="container mx-auto h-full flex justify-center items-center px-4">
          <div className="relative top-[-50px] bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 md:p-12 w-full max-w-md md:max-w-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-6 md:mb-8">
              Request Leave
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 md:mb-6">
                <label
                  htmlFor="reason"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Your Reason
                </label>
                <input
                  type="text"
                  id="reason"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-200"
                  placeholder="..."
                  {...register("reason")}
                  maxLength={200}
                  required
                />
                {errors.reason && (
                  <span className="text-red-500 text-sm">
                    {errors.reason.message}
                  </span>
                )}
              </div>
              <div className="mx-auto max-w-md flex justify-center items-center dark:bg-gray-800 text-center mt-5">
                <DayPicker
                  mode="range"
                  // min={1}
                  // max={maxLeaveDays}
                  selected={range}
                  onSelect={handleSelect}
                  disabled={(day) => day < new Date()}
                  className="justify-center dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-200 mt-4"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LeaveRequestPage;
