import axios from "axios";
import { handleError } from "./ErrorHandler";
import { data } from "autoprefixer";
import { toast } from "react-toastify";

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

export const registerAPI = async (firstName, lastName, email, employeeRole, code, password, confirmPassword) => {
  try {
    const data = await axios.post(api + "auth/register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      employeeRole: employeeRole,
      code: code,
      password: password,
      confirmPassword: confirmPassword,
    });
    return data;
  } catch (error) {
    // handleError(error);
    console.error(error);
    return error.response;
  }
};

// reset password request
export const resetPasswordRequestAPI = async (email) => {
  try {
    const data = await axios.post(api + "auth/reset-password-request", {
      email: email,
    });
    return data;
  } catch (error) {
    // handleError(error);
    console.error(error);
  }
};

export const resetPasswordAPI = async (token, email, password, confirmPassword) => {
  try {
    const data = await axios.post(api + "auth/reset-password", {
      token: token,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
    console.log(data);
    return data;
  } catch (error) {
    // handleError(error);
    console.error(error);
  }
}
