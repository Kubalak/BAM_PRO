import axios from 'axios';

/**
 * Funkcja do uwierzytelniania dwuskładnikowego
 * @param {FormData} formData2FA - Dane uwierzytelniania dwuskładnikowego
 * @returns {Promise<object>} - Obiekt odpowiedzi po uwierzytelnieniu
 * @throws {Error} - Błąd podczas uwierzytelniania dwuskładnikowego
 */
export const authenticate2FA = async (formData2FA) => {
  try{
    const addr = `${process.env.EXPO_PUBLIC_API_URL}/main/authenticate/`
    console.info(addr)
    const response = await axios.post(addr,formData2FA);
    return response.data;
  }catch(error)
  {
    throw new Error(error.response.data.error);
  }
}

/**
 * Funkcja do rejestracji użytkownika
 * @param {FormData} formDataRegister - Dane rejestracyjne użytkownika
 * @returns {Promise<object>} - Obiekt odpowiedzi po rejestracji
 * @throws {Error} - Błąd podczas rejestracji użytkownika
 */
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

/**
 * Funkcja do logowania użytkownika
 * @param {FormData} formDataLogin - Dane logowania użytkownika
 * @returns {Promise<object>} - Obiekt odpowiedzi po zalogowaniu
 * @throws {Error} - Błąd podczas logowania użytkownika
 */
export const loginUser = async (formDataLogin) => {
  try {
    const addr = `${process.env.EXPO_PUBLIC_API_URL}/main/login/`
    console.info(addr)
    const response = await axios.post(addr,formDataLogin);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

/**
 * Obiekt do wykonywania żądań HTTP do API
 */
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  withCredentials: true
})
export default api;