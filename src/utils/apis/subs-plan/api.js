import axiosWithConfig from "../axiosWithConfig";
export const getSubs = async () => {
  try {
    const response = await axiosWithConfig.get("/subs-plan");

    return response.data;
  } catch (error) {
    throw Error("Failed to get class");
  }
};
export const getMySubs = async () => {
  try {
    const response = await axiosWithConfig.get(
      "/subs-plan",
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to get class");
  }
};


export const getDetailSubs = async (subsId) => {
  try {
    const response = await axiosWithConfig.get(`/subs-plan/${subsId}`);

    return response.data;
  } catch (error) {
    throw Error("Gagal mendapatkan detail kelas" + error);
  }
}; 


export const createSubs = async (subsData) => {
    try {
      const response = await axiosWithConfig.post("/subs-plan", subsData);
      return response.data;
    } catch (error) {
      throw Error("Failed to create subs");
    }
};

export const updateSubs = async (subsId, subsData) => {
  try {
    const response = await axiosWithConfig.put(`/subs-plan/${subsId}`, subsData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update subs");
  }
};

 
export const deleteSubs = async (subsId) => {
  try {
    const response = await axiosWithConfig.delete(`/subs-plan/${subsId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete subs");
  }
};
