import axios from 'axios';


export const registerUser = async (formDataRegister) => {
  try {
    const addr = `${process.env.EXPO_PUBLIC_API_URL}/main/register/`
    console.info(addr)
    const response = await axios.post(addr,formDataRegister);
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

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  withCredentials: true
})
export default api;