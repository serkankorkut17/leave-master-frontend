import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  createNewEmployeeInfoAPI,
  getNewEmployeeInfosAPI,
  deleteNewEmployeeInfoAPI,
} from '../services/AdminService';
import { useAuthContext } from '../context/Auth';
import { FaClipboard } from 'react-icons/fa';

const NewEmployeePage = () => {
  const { token } = useAuthContext();
  const [date, setDate] = useState('');
  const [employeeInfos, setEmployeeInfos] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetchEmployeeInfos();
  }, [token]);

  const fetchEmployeeInfos = async () => {
    try {
      const response = await getNewEmployeeInfosAPI();
      setEmployeeInfos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch employee infos');
    }
  };

  const handleCreate = async () => {
    if (!date) {
      toast.error('Please select a date');
      return;
    }
    try {
      const response = await createNewEmployeeInfoAPI(date);
      if (response) {
        toast.success('Employee info created successfully');
        fetchEmployeeInfos(); // Refresh the list
        setDate(''); // Clear the input
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to create employee info');
    }
  };

  const handleDelete = async id => {
    try {
      const response = await deleteNewEmployeeInfoAPI(id);
      if (response) {
        toast.success('Employee info deleted successfully');
        fetchEmployeeInfos(); // Refresh the list
      } else {
        toast.error('Failed to delete employee info');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete employee info');
    }
  };

  const handleCopy = async text => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Signup code copied to clipboard');
    } catch (error) {
      console.error(error);
      toast.error('Failed to copy signup code');
    }
  };

  return (
    <div className="container mx-auto mt-16">
      <section className="pt-4 mb-8 dark:bg-gray-900">
        <p className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mt-4 mb-6 md:mb-8">
          Add New Employee
        </p>
        <div className="flex justify-center mb-4">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border p-2 rounded-md dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={handleCreate}
            className="ml-4 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </section>
      <section>
        <p className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-6 md:mb-8">
          New Employee Infos
        </p>
        {employeeInfos.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-300">
            No employee infos found.
          </p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                  Signup Code
                </th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {employeeInfos.map(info => (
                <tr
                  key={info.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {new Date(info.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 flex items-center space-x-2">
                    <span>{info.signupCode}</span>
                    <button
                      onClick={() => handleCopy(info.signupCode)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600"
                    >
                      <FaClipboard />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDelete(info.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default NewEmployeePage;
