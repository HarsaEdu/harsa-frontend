import axiosWithConfig from "../axiosWithConfig";

export const getUser = async (params) => {
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

  const url = query ? `/users?&${query}` : "/users?offset=0&limit=10";

  try {
    const response = await axiosWithConfig.get(url);

    return response.data;
  } catch (error) {
    throw Error("Failed to get user");
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axiosWithConfig.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};

export const getUserAccount = async (userId) => {
  try {
    const response = await axiosWithConfig.get(`/users/account/${userId}`);

    return response.data;
  } catch (error) {
    throw Error("Failed to get user account");
  }
};

export const updateUserAccount = async (userId, updatedData) => {
  try {
    const response = await axiosWithConfig.put(`/users/${userId}`, updatedData);

    return response.data;
  } catch (error) {
    throw new Error("Failed to update user account");
  }
};

export const getUserInsructor = async () => {
  try {
    const response = await axiosWithConfig.get(
      "/users?offset=0&limit=9999&roleID=2",
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to get user");
  }
};

export const getMyProfile = async () => {
  try {
    const response = await axiosWithConfig.get(`/users/profile/myprofile`);
    return response.data;
  } catch (error) {
    throw Error("Failed to get user profile");
  }
};

export const editUserProfile = async (data) => {
  try {
    const response = await axiosWithConfig.put(`/users/profile/myprofile`, data);
    return response.data;
  } catch (error) {
    throw Error("Failed to get user profile");
  }
}

export const getAllStudents = async () => {
  try {
    const response = await axiosWithConfig.get(
      "/users?offset=0&limit=10&search=&roleID=3",
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to get user");
  }
};

export const getUserInstructorTable = async (params) => {
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

  const url = query ? `/users?&roleID=2&${query}` : "/users?offset=0&limit=10";

  try {
    const response = await axiosWithConfig.get(url);

    return response.data;
  } catch (error) {
    throw Error("Failed to get user");
  }
};

export const getUserStudentTable = async (params) => {
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
    ? `/users?&roleID=3&${query}`
    : "/users?offset=0&limit=10&roleID=3";

  try {
    const response = await axiosWithConfig.get(url);

    return response.data;
  } catch (error) {
    throw Error("Failed to get user");
  }
};

export const getUserStudents = async (params, id) => {
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
