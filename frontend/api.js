import axios from 'axios';


/**
 * Obiekt do wykonywania żądań HTTP do API
 */
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  withCredentials: true
})
export default api;