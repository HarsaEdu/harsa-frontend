import exp from "constants";
import axiosWithConfig from "../axiosWithConfig";

export const getCategory = async () => {
  try {
    const response = await axiosWithConfig.get("/categories?offset=0&limit=10");

    return response.data;
  } catch (error) {
    throw Error("Failed to get category");
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