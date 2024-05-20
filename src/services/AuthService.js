import axios from "axios";
import { handleError } from "./ErrorHandler";
import { data } from "autoprefixer";

const api = "http://localhost:5247/api/";

export const loginAPI = async (email, password) => {
  try {
    const data = await axios.post(api + "auth/login", {
      email: email,
      password: password,
    });
    console.log(data);
    return data;
  } catch (error) {
    // handleError(error);
    console.log(error);
  }
};

export const registerAPI = async (firstName, lastName, email, startDate, password, confirmPassword) => {
  try {
    const data = await axios.post(api + "auth/register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      startDate: startDate,
      password: password,
      confirmPassword: confirmPassword,
    });
    return data;
  } catch (error) {
    // handleError(error);
    console.error(error);
  }
};
