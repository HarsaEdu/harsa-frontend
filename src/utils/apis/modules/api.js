import axiosWithConfig from "../axiosWithConfig";

const getModuleBySection = async (courseId, sectionId) => {
  try {
    const response = await axiosWithConfig.get(
      `/courses/${courseId}/section/${sectionId}?offset=0&limit=10`,
    );

    return response.data;
  } catch (error) {
    throw Error(
      "Failed to get Module by Section : " + error.response.data.message
    );
  }
};

const getModuleById = async (moduleId) => {
  try {
    const response = await axiosWithConfig.get(
      `/courses/section/module/${moduleId}`,
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to get Module by id : " + error.response.data.message);
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
    throw Error("Failed to create section : " + error.response.data.message);
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
    throw Error("Failed to create section : " + error.response.data.message);
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
    throw Error("Failed to create section : " + error.response.data.message);
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
    console.log(error);
    throw Error("Failed to edit Module : " + error.response.data.message);
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
