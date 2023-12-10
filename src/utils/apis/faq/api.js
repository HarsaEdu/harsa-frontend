import axiosWithConfig from "../axiosWithConfig";

export const deleteFAQ = async (idFAQ) => {
    try {
        const response = await axiosWithConfig.delete(`/faqs/${idFAQ}`);
  
        return response.data;
    }   catch (error) {
        throw Error("Failed to get Category");
    }
};

export const updateFAQ = async (idFAQ, data) => {
    try {
        const response = await axiosWithConfig.put(`/faqs/${idFAQ}`, data, {
            headers: {
              "Content-Type": "application/json",
            },
          });
  
        return response.data;
    }   catch (error) {
        throw Error("Failed to save FAQ");
    }
};