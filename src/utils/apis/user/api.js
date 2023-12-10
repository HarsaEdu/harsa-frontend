import axiosWithConfig from "../axiosWithConfig";

export const getUser = async () => {
    try {
        const response = await axiosWithConfig.get("/users?offset=0&limit=2000");
  
        return response.data;
    }   catch (error) {
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
    }   catch (error) {
        throw Error("Failed to get user account");
    }
};

export const updateUserAccount = async (userId) => {
    try {
        const response = await axiosWithConfig.get(`/users/${userId}`);
  
        return response.data;
    }   catch (error) {
        throw Error("Failed to get user account");
    }
};
  
export const getUserInsructor = async () => {
    try {
        const response = await axiosWithConfig.get("/users?offset=0&limit=9999&roleID=2");
  
        return response.data;
    }   catch (error) {
        throw Error("Failed to get user");
    }
};