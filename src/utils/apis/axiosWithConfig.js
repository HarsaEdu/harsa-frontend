import axios from "axios";

let bearerToken = localStorage.getItem("access_token");
let refreshToken = localStorage.getItem("refresh_token");
let baseUrl = "https://api.harsaedu.my.id/web";
const axiosWithConfig = axios.create();

export const setAxiosConfig = (token) => {
  bearerToken = token;
};

const handleLogout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("role_name");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  navigate("/login");
};

axiosWithConfig.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = baseUrl;
  axiosConfig.headers.Authorization = `Bearer ${bearerToken}`;

  return axiosConfig;
});

axiosWithConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to an invalid token
    if (error.response && error.response.status === 400) {
      try {
        const response = await axios.post(
          "https://api.harsaedu.my.id/web/auth/access-token",
          {
            refresh_token: refreshToken,
          }
        );

        if (response.status === 200) {
          const newAccessToken = response.data.data.access_token;
          localStorage.setItem("access_token", newAccessToken);
          setAxiosConfig(newAccessToken);

          // Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // Handle error during token refresh
        console.error("Error refreshing token:", refreshError);
        throw refreshError;
      
        // Call the logout function when refreshing token fails
        handleLogout();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosWithConfig;
