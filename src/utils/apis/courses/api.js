import axiosWithConfig from "../axiosWithConfig";

export const getCourse = async (params) => {
  let query = "";

  if (params) {
    const queryParams = [];

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams.push(`${key}=${params[key]}`);
      }
    }

    query = queryParams.join("&");
  }

  const url = query ? `/courses?&${query}` : "/courses?offset=0&limit=9999";
  try {
    const response = await axiosWithConfig.get(url);

    return response.data;
  } catch (error) {
    throw Error("Failed to get class");
  }
};
export const getMyCourse = async (params) => {
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

export const getModuleById = async (moduleId) => {
  try {
    const response = await axiosWithConfig.get(
      `/courses/section/module/${moduleId}`,
    );

    return response.data;
  } catch (error) {
    throw Error("Gagal mendapatkan data materi" + error);
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

export const deleteCourse = async (courseId) => {
  try {
    const response = await axiosWithConfig.delete(`/courses/${courseId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete course");
  }
};

export const putCourse = async (courseId, courseData) => {
  try {
    const response = await axiosWithConfig.put(
      `/courses/${courseId}`,
      courseData,
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to edit course");
  }
};
