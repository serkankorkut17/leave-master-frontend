import axios from 'axios';

const api = 'http://localhost:5247/api/admin/';

export const getRoleAPI = async () => {
  try {
    const data = await axios.get(api + 'role');
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUsersAPI = async () => {
  try {
    const data = await axios.get(api + 'get-users');
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createNewEmployeeInfoAPI = async date => {
  try {
    const signupCode = generateSignupCode();
    const response = await axios.post(api + 'new-employee-info', {
      startDate: date,
      signupCode: signupCode,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getNewEmployeeInfosAPI = async () => {
  try {
    const response = await axios.get(api + 'new-employee-infos');
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteNewEmployeeInfoAPI = async id => {
  try {
    const response = await axios.delete(api + `new-employee-info/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

function generateSignupCode(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}
