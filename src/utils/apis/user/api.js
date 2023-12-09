import axiosWithConfig from "../axiosWithConfig";

export const getUser = async () => {
    try {
        const response = await axiosWithConfig.get("/users?offset=0&limit=10");
  
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
  