import axios from "axios";

let bearerToken = localStorage.getItem("access_token");
let baseUrl = "https://api.harsaedu.my.id/web";
const axiosWithConfig = axios.create();

export const setAxiosConfig = (token) => {
  bearerToken = token;
};
axiosWithConfig.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = baseUrl;
  axiosConfig.headers.Authorization = `Bearer ${bearerToken}`;

  return axiosConfig;
});

export default axiosWithConfig;