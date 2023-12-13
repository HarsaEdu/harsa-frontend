import axiosWithConfig from "../axiosWithConfig";

const getModuleBySection = async (courseId, sectionId) => {
  try {
    const response = await axiosWithConfig.get(
      `/courses/${courseId}/section/${sectionId}?offset=0&limit=10`,
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to get Module by Section" + error);
  }
};

const getModuleById = async (courseId) => {
  try {
    const response = await axiosWithConfig.get(
      `/courses/section/module/${courseId}`,
    );

    return response.data;
  } catch (error) {
    throw Error("Gagal mendapatkan detail materi" + error);
  }
};

const createSection = async (courseId, data) => {
  try {
    const response = await axiosWithConfig.post(
      `/courses/${courseId}/section`,
      data,
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to create section" + error);
  }
};

const createModuleBySection = async (sectionId, data) => {
  try {
    const response = await axiosWithConfig.post(
      `/courses/section/${sectionId}/module`,
      data,
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to create section" + error);
  }
};

export {
  getModuleBySection,
  createSection,
  createModuleBySection,
  getModuleById,
};
