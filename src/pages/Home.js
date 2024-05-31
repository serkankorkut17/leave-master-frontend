import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
import { getLeaveRequestsAPI, getUsersLeaveRequestAPI, getMaxLeaveDaysAPI } from '../services/LeaveRequestService';
import { approveLeaveRequestAPI, refuseLeaveRequestAPI } from '../services/LeaveService';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes } from 'react-icons/fa';
import LeaveRequestModal from '../components/LeaveRequestModal';
import Loading from '../components/Loading';

function HomePage() {
  const { user, token, role, isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [userLeaveRequest, setUserLeaveRequest] = useState(null);
  const [maxLeaveDays, setMaxLeaveDays] = useState(null);
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

    const fetchLeaveRequests = async () => {
      try {
        const response = await getLeaveRequestsAPI();
        if (response) {
          setLeaveRequests(response.data);
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch leave requests');
      }
    };

    const fetchUserLeaveRequest = async () => {
      try {
        const response = await getUsersLeaveRequestAPI();
        if (response) {
          setUserLeaveRequest(response.data);
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch user leave request');
      }
    };

    const fetchMaxLeaveDays = async () => {
      try {
        const response = await getMaxLeaveDaysAPI();
        if (response) {
          setMaxLeaveDays(response.data);
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch max leave days');
      }
    };

    if (role === 'Admin') {
      fetchLeaveRequests();
    } else {
      fetchUserLeaveRequest();
      fetchMaxLeaveDays();
    }

    setIsLoading(false);
  }, [token, role, user]);

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
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome, {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            You are logged in as a {role}
          </p>
        </div>
        {role === 'Admin' ? (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white px-2 mb-6">
              Leave Requests
            </h2>
            <div className="overflow-x-auto">
              {leaveRequests.length === 0 ? (
                <p className="text-center text-xl text-gray-700 dark:text-gray-300">
                  No leave requests found.
                </p>
              ) : (
                <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg shadow-md">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                        User Name
                      </th>
                      <th className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                        Start Date
                      </th>
                      <th className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                        End Date
                      </th>
                      <th className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                        Leave Days
                      </th>
                      <th className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                        Reason
                      </th>
                      <th className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {leaveRequests.map(request => (
                      <tr
                        key={request.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
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
                            onClick={e => {
                              e.stopPropagation();
                              handleApprove(request.id);
                            }}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-600 p-2"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={e => {
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
        ) : (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white px-2 mb-6">
              Your Leave Information
            </h2>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              {maxLeaveDays !== null && (
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  Maximum Leave Days: <span className="font-semibold">{maxLeaveDays}</span>
                </p>
              )}
              {userLeaveRequest ? (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Your Leave Request
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Start Date:</strong> {new Date(userLeaveRequest.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>End Date:</strong> {new Date(userLeaveRequest.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Leave Days:</strong> {userLeaveRequest.leaveDays}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Reason:</strong> {userLeaveRequest.reason}
                  </p>
                </div>
              ) : (
                <p className="text-xl text-gray-700 dark:text-gray-300">
                  You have no leave requests.
                </p>
              )}
            </div>
          </div>
        )}
        {openModal && selectedRequest && (
          <LeaveRequestModal
            setOpenModal={setOpenModal}
            leaveRequest={leaveRequests.find(request => request.id === selectedRequest)}
            sameRoleCollisions={leaveRequests.filter(
              req => req.role === user.role && req.startDate <= leaveRequests.find(request => request.id === selectedRequest).endDate && req.endDate >= leaveRequests.find(request => request.id === selectedRequest).startDate
            ).length}
            differentRoleCollisions={leaveRequests.filter(
              req => req.role !== user.role && req.startDate <= leaveRequests.find(request => request.id === selectedRequest).endDate && req.endDate >= leaveRequests.find(request => request.id === selectedRequest).startDate
            ).length}
            recommendation={
              leaveRequests.filter(
                req => req.role === user.role && req.startDate <= leaveRequests.find(request => request.id === selectedRequest).endDate && req.endDate >= leaveRequests.find(request => request.id === selectedRequest).startDate
              ).length > 0 ? 'Consider alternative dates' : 'Approved'
            }
          />
        )}
      </div>
    </>
  );
}

export default HomePage;
