import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/Auth";
import { getLeaveRequestAPI } from "../services/LeaveRequestService";
import Loading from "./Loading";

const LeaveRequestModal = (props) => {
  const { setOpenModal, requestId } = props;
  const [leaveRequest, setLeaveRequest] = useState(null);
  const [sameRoleCollisions, setSameRoleCollisions] = useState([]);
  const [differentRoleCollisions, setDifferentRoleCollisions] = useState([]);
  const [recommendation, setRecommendation] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const { token } = useAuthContext();

  useEffect(() => {
    if (!token) return;
    const fetchLeaveRequest = async () => {
      try {
        const response = await getLeaveRequestAPI(requestId);
        if (response) {
          setLeaveRequest(response.data.leaveRequest);
          setSameRoleCollisions(response.data.sameRoleCollisions);
          setDifferentRoleCollisions(response.data.differentRoleCollisions);
          setRecommendation(response.data.recommendation);
        }
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchLeaveRequest();
  }, [token, requestId]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="sm:ml-32 overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full inset-0 flex">
        <div className="z-50 relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow-xl dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Leave Request Details
              </h3>
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {leaveRequest && (
              <div className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="userName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      User Name
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {leaveRequest.userName}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="startDate"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Start Date
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(leaveRequest.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="endDate"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      End Date
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(leaveRequest.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="leaveDays"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Leave Days
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {leaveRequest.leaveDays}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="reason"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Reason
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {leaveRequest.reason}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="sameRoleCollisions"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Same Role Collisions
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {sameRoleCollisions}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="differentRoleCollisions"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Different Role Collisions
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {differentRoleCollisions}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="recommendation"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Recommendation
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {recommendation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="opacity-50 fixed inset-0 z-40 bg-black"
          onClick={() => setOpenModal(false)}
        ></div>
      </div>
    </>
  );
};

export default LeaveRequestModal;
