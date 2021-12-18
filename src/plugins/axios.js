import axios from "axios";
let config = {
  baseURL: process.env.VUE_APP_ROOT_BACKEND,
  // timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
};
const axiosApi = axios.create(config);

export default axiosApi


