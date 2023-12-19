import axiosWithConfig from "../axiosWithConfig";

export const getAllPaymentHistory = async (params) => {
  try {
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

    const url = query ? `/payments?&${query}` : "/payments?offset=0&limit=10";

    const response = await axiosWithConfig.get(url);

    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
};
export const exportAllPaymentHistory = async () => {
  try {
    const response = await axiosWithConfig.get(
      "/payments?offset=0&limit=9999999999",
    );

    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
};
