import axios from "axios";

const api = "http://localhost:5247/api/";

export const getLeaveRequestsAPI = async () => {
  try {
    const data = await axios.get(api + "leave-request/all");
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getLeaveRequestAPI = async (id) => {
  try {
    const data = await axios.get(api + "leave-request/" + id);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUsersLeaveRequestAPI = async () => {
  try {
    const data = await axios.get(api + "leave-request");
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const createLeaveRequestAPI = async (reason, from, to) => {
  try {
    const data = await axios.post(api + "leave-request", {
      reason: reason,
      startDate: from,
      endDate: to,
    });
    return data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const deleteLeaveRequestAPI = async () => {
  try {
    const data = await axios.delete(api + "leave-request");
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getMaxLeaveDaysAPI = async () => {
  try {
    const data = await axios.get(api + "leave-request/max-leave-days");
    return data;
  } catch (error) {
    console.error(error);
  }
};
