import axiosWithConfig from "../axiosWithConfig";

export const getCourse = async () => {
  try {
    const response = await axiosWithConfig.get("/courses?offset=0&limit=10");

    return response.data;
  } catch (error) {
    throw Error("Failed to get class");
  }
};
export const getMyCourse = async () => {
  try {
    const response = await axiosWithConfig.get(
      "/courses/my-course?offset=0&limit=10",
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to get class");
  }
};

export const getDetailCourse = async (courseId) => {
  try {
    const response = await axiosWithConfig.get(`/courses/${courseId}`);

    return response.data;
  } catch (error) {
    throw Error("Gagal mendapatkan detail kelas" + error);
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await axiosWithConfig.post("/courses", courseData);
    return response.data;
  } catch (error) {
    throw Error("Failed to create course");
  }
};