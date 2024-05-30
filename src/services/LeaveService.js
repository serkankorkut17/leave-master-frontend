import { data } from "autoprefixer";
import axios from "axios";

const api = "http://localhost:5247/api/leaves";

export const approveLeaveRequestAPI = async (id) => {
  try {
    const data = await axios.post(api + "/approve/" + id);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const refuseLeaveRequestAPI = async (id) => {
  try {
    const data = await axios.post(api + "/refuse/" + id);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getLeavesAPI = async (month, year) => {
  try {
    const data = await axios.post(api + "/leaves-by-month-year", {
      month: month,
      year: year,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
