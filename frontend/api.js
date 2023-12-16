import axios from 'axios';


/**
 * Obiekt do wykonywania żądań HTTP(S) do API
 */
const api = axios.create({
  /**
   * Bazowy adres, na które mają być wysyłane zapytania.
   */
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  /**
   * Przesyłaj ciastka przy zapytaniach.
   */
  withCredentials: true
})
export default api;