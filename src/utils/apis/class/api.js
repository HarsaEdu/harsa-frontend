import axiosWithConfig from "../axiosWithConfig";

export const getCourse = async () => {
  try {
    const response = await axiosWithConfig.get(
      "/web/courses?offset=0&limit=10",
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to get class");
  }
};

export const getDetailCourse = async (courseId) => {
  try {
    const response = await axiosWithConfig.get(`/web/courses/${courseId}`);

    return response.data;
  } catch (error) {
    throw Error("Gagal mendapatkan detail kelas" + error);
  }
};
