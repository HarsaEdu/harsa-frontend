import axiosWithConfig from "../axiosWithConfig";

export const getAllSubmission = async (idSection, params) => {
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

  const url = query
    ? `/courses/modules/${idSection}/submissions?&${query}`
    : `/courses/modules/${idSection}/submissions`;

  try {
    const response = await axiosWithConfig.get(url);

    return response.data;
  } catch (error) {
    throw Error("Failed to get submission");
  }
};

export const getSubmissionById = async (idSubmission, idSection) => {
  try {
    const response = await axiosWithConfig.get(
      `/courses/modules/${idSection}/submissions/${idSubmission}`,
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to get submission");
  }
};

export const createSubmission = async (data, idSection) => {
  try {
    const newData = { ...data };

    const response = await axiosWithConfig.post(
      `/courses/modules/${idSection}/submissions`,
      newData,
    );

    return response.data;
  } catch (error) {
    throw Error("Failed To Create Submission");
  }
};

export const deleteSubmission = async (idSubmission, idSection) => {
  try {
    const response = await axiosWithConfig.delete(
      `courses/modules/${idSection}/submissions/${idSubmission}`,
    );

    return response;
  } catch (error) {
    throw Error("Failed to Delete Submission");
  }
};

export const updateSubmission = async (data, idSection, idSubmission) => {
  try {
    const newData = { ...data };

    const response = await axiosWithConfig.put(
      `/courses/modules/${idSection}/submissions/${idSubmission}`,
      newData,
    );

    return response.data;
  } catch (error) {
    throw Error("Failed To Create Submission");
  }
};
