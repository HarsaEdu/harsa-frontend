import axios from "axios";

let bearerToken = localStorage.getItem("refresh_token");
let baseUrl = "https://api.harsaedu.my.id";
const axiosWithConfig = axios.create();

axiosWithConfig.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = baseUrl;
  axiosConfig.headers.Authorization = `Bearer ${bearerToken}`;

  return axiosConfig;
});

export default axiosWithConfig;
