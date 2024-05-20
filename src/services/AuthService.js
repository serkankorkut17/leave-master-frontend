import axios from "axios";
import { handleError } from "./ErrorHandler";

const api = "http://localhost:5167/api/";

export const loginAPI = async (email, password) => {
  try {
    const data = await axios.post(api + "auth/login", {
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (email, username, password) => {
  try {
    const data = await axios.post(api + "auth/register", {
      email: email,
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
