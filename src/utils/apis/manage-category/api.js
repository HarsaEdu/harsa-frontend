import exp from "constants";
import axiosWithConfig from "../axiosWithConfig";

export const getCategory = async (params) => {
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

  const url = query ? `/categories?&${query}` : "/categories?offset=0&limit=10";

  try {
    const response = await axiosWithConfig.get(url);

    return response.data;
  } catch (error) {
    throw Error("Failed to get user");
  }
};

export const addCategory = async (FormData) => {
  try {
    const response = await axiosWithConfig.post("/categories", FormData);
    return response.data;
  } catch (error) {
    throw Error("Failed to get category");
  }
}

export const deleteCategory = async (id) => {
  try {
    const response = await axiosWithConfig.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw Error("Failed to get category");
  }
}

export const editCategory = async (id, data) => {
  try {
    const response = await axiosWithConfig.put(`/categories/${id}`, data);
    return response.data;
  } catch (error) {
    throw Error("Failed to get category");
  }
}