import axios from 'axios';

const BASE_URL = 'http://192.168.0.145:8080'; // Replace with your Django server URL

export const registerUser = async (formDataRegister) => {
  try {
    const response = await axios.post("http://192.168.0.145:8080/main/register/",formDataRegister);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// export const loginUser = async (username, password) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/main/login/`, {
//       username,
//       password,
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response.data.error);
//   }
// };