import axiosWithConfig from "../axiosWithConfig";

const getNotification = async () => {
  try {
    const response = await axiosWithConfig.get(
      "/notification?offset=0&limit=5",
    );
    return response.data;
  } catch (error) {
    throw Error("Failed to get notification: " + error.message);
  }
};

const getNotificationById = async (notificationId) => {
  try {
    const response = await axiosWithConfig.get(
      `/notification/${notificationId}`,
    );
    return response.data;
  } catch (error) {
    throw Error("Failed to get notification: " + error.message);
  }
};

const readNotification = async (id) => {
  try {
    const response = await axiosWithConfig.patch(
      `/notifications/read/${id}`,
      {},
    );
    return response.data;
  } catch (error) {
    throw Error("Failed to update read notification: " + error.message);
  }
};

const deleteNotification = async (id) => {
  try {
    const response = await axiosWithConfig.delete(`/notifications/${id}`, {});
    return response.data;
  } catch (error) {
    throw Error("Failed to delete notification: " + error.message);
  }
};

export {
  getNotification,
  getNotificationById,
  readNotification,
  deleteNotification,
};
