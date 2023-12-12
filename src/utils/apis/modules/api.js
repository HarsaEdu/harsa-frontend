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

const getModuleById = async (moduleId) => {
  try {
    const response = await axiosWithConfig.get(
      `/courses/section/module/${moduleId}`,
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to get Module by id" + error);
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

const editSection = async (courseId, sectionId, data) => {
  try {
    const response = await axiosWithConfig.put(
      `/courses/${courseId}/section/${sectionId}`,
      data,
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to create section" + error);
  }
};

const editModule = async (moduleId, data) => {
  try {
    const response = await axiosWithConfig.put(
      `/courses/section/module/${moduleId}`,
      data,
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to edit Module" + error);
  }
};

export {
  getModuleBySection,
  getModuleById,
  createSection,
  createModuleBySection,
  editSection,
  editModule,
};
