import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
import { getLeaveRequestsAPI } from '../services/LeaveRequestService';
import {
  approveLeaveRequestAPI,
  refuseLeaveRequestAPI,
} from '../services/LeaveService';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes } from 'react-icons/fa';
import LeaveRequestModal from '../components/LeaveRequestModal';
import Loading from '../components/Loading';

function HomePage() {
  const { user, token, role, isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (!token) return;
    setIsLoading(true);
    // fetch leave requests
    const fetchLeaveRequests = async () => {
      try {
        const response = await getLeaveRequestsAPI();
        if (response) {
          setLeaveRequests(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch leave requests');
      }
    };
    fetchLeaveRequests();
    setIsLoading(false);
  }, [token]);

  const handleApprove = async id => {
    try {
      const response = await approveLeaveRequestAPI(id);
      if (response) {
        toast.success('Leave request approved');
        setLeaveRequests(leaveRequests.filter(request => request.id !== id));
      } else {
        toast.error('Failed to approve leave request');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to approve leave request');
    }
  };

  const handleRefuse = async id => {
    try {
      const response = await refuseLeaveRequestAPI(id);
      console.log(response);
      if (response) {
        toast.success('Leave request refused');
        setLeaveRequests(leaveRequests.filter(request => request.id !== id));
      } else {
        toast.error('Failed to refuse leave request');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to refuse leave request');
    }
  };

  const openRequestHandler = id => {
    setOpenModal(true);
    setSelectedRequest(id);
  };

  return (
    <>
      {isLoading && <Loading />}
    <div className="container mx-auto mt-20 mb-4">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
        Welcome, {user?.firstName} {user?.lastName}
      </h1>
      <p className="text-center text-gray-700 dark:text-gray-300">
        You are logged in as a {role}
      </p>
      {role === 'Admin' && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white px-2">
            Leave Requests
          </h2>
          <div className="mt-4 overflow-x-auto">
            {leaveRequests.length === 0 ? (
              <p className="text-center text-gray-700 dark:text-gray-300">
                No leave requests found.
              </p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                      User Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                      Leave Days
                    </th>
                    <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {leaveRequests.map(request => (
                    <tr
                      key={request.id}
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => openRequestHandler(request.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {request.userName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {new Date(request.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {new Date(request.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {request.leaveDays}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {request.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(request.id);
                          }}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-600 p-2"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRefuse(request.id);
                          }}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600 p-2"
                        >
                          <FaTimes />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
      {openModal && (
        <LeaveRequestModal
          setOpenModal={setOpenModal}
          requestId={selectedRequest}
          leaveRequests={leaveRequests}
          setLeaveRequests={setLeaveRequests}
        />
      )}
    </div>
    </>
  );
}

export default HomePage;
