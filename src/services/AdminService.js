import axios from "axios";

const api = "http://localhost:5247/api/admin/";

export const getRoleAPI = async () => {
  try {
    const data = await axios.get(api + "role");
    return data;
  } catch (error) {
    console.error(error);
  }
};
