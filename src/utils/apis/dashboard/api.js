import axiosWithConfig from "../axiosWithConfig";

export const getAllCourse = async () => {
  try {
    const response = await axiosWithConfig.get(
      "/dashboard/instructur/course?offset=0&limit=9999",
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to get course");
  }
};

export const getCouseByID = async (courseId) => {
  try {
    const response = await axiosWithConfig.get(
      `/dashboard/instructur/course/${courseId}`,
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to get user account");
  }
};

export const getAllCountData = async () => {
  try {
    const response = await axiosWithConfig.get("/admin/dashboard/count");

    return response.data;
  } catch (error) {
    throw Error("Failed to get course");
  }
};

export const getLastYearProfit = async () => {
  try {
    const response = await axiosWithConfig.get("/payments/last-year");

    return response.data;
  } catch (error) {
    throw Error("Failed to get course");
  }
};
