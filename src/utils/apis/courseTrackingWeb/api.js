import axiosWithConfig from "../axiosWithConfig";

export const getAllSubscribers = async (id) => {
  try {
    const response = await axiosWithConfig.get(
      `https://api.harsaedu.my.id/web/course/${id}/user/subscribe?offset=0&limit=999999999`,
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to get user");
  }
};

export const enrollUser = async (id, idCourse) => {
  try {
    const response = await axiosWithConfig.post(
      `https://api.harsaedu.my.id/web/course/${idCourse}/user/${id}`,
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to enroll user");
  }
};

export const getUserEnroll = async (params, id) => {
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
    ? `/course/${id}/user?&${query}`
    : `/course/${id}/user?offset=0&limit=10`;

  try {
    const response = await axiosWithConfig.get(url);

    return response.data;
  } catch (error) {
    throw Error("Failed to get user");
  }
};

export const deleteEnrollUser = async (id, idCourse) => {
  try {
    const response = await axiosWithConfig.delete(
      `https://api.harsaedu.my.id/web/course/${idCourse}/user/tracking/${id}`,
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to enroll user");
  }
};
