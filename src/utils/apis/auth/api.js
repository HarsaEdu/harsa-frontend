import { setAxiosConfig } from "@/utils/apis/axiosWithConfig";
import { useNavigate } from "react-router-dom";

export const handleTokenRefresh = async (refreshToken) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role_name");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };
  
  try {
    const response = await axios.post(
      "https://api.harsaedu.my.id/web/auth/access-token",
      {
        refresh_token: refreshToken,
      }
    );

    if (response.status === 200) {
      const { access_token } = response.data.data;
      localStorage.setItem("access_token", access_token);
      setAxiosConfig(access_token);
      return access_token;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    handleLogout(); // Call handleLogout on token refresh failure
    throw error; // Propagate the error for handling in the calling function
  }
};

// catch (error) {
//   if (error.response && error.response.status === 401) {
//     try {
//       const refresh_token = localStorage.getItem("refresh_token");
//       const newAccessToken = await handleTokenRefresh(refresh_token);

//       if (newAccessToken) {
//         setAxiosConfig(newAccessToken);
//         onSubmit(data); // Retry login
//       } else {
//         // Token refresh failed, redirect to login page
//         navigate("/");
//       }
//     } catch (refreshError) {
//       console.error("Error during token refresh:", refreshError);
//       navigate("/");
//     }
//   } else {
//     form.setError("password", {
//       type: "manual",
//       message: "*email atau password salah, periksa kembali",
//     });
//     console.error("An error occurred during login:", error);
//   }
// }