import axiosWithConfig from "../axiosWithConfig";

export const getCategory = async () => {
    try {
        const response = await axiosWithConfig.get("/categories?offset=0&limit=999");
  
        return response.data;
    }   catch (error) {
        throw Error("Failed to get Category");
    }
};