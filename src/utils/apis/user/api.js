import axiosWithConfig from "../axiosWithConfig";

export const getUser = async () => {
    try {
        const response = await axiosWithConfig.get("/users?offset=0&limit=10");
  
        return response.data;
    }   catch (error) {
        throw Error("Failed to get class");
    }
};