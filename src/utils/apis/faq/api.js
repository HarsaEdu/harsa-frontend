import axiosWithConfig from "../axiosWithConfig";

export const deleteFAQ = async (idFAQ) => {
    try {
        const response = await axiosWithConfig.delete(`/faqs/${idFAQ}`);
  
        return response.data;
    }   catch (error) {
        throw Error("Failed to get Category");
    }
};