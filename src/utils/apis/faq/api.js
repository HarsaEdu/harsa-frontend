import axiosWithConfig from "../axiosWithConfig";

export const getFAQ = async (params) => {
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
  
    const url = query ? `/faqs?&${query}` : "/faqs?offset=2&limit=10";
  
    try {
      const response = await axiosWithConfig.get(url);
  
      return response.data;
    } catch (error) {
      throw Error("Failed to get user");
    }
  };

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