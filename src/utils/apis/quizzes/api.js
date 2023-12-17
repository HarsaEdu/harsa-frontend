import axiosWithConfig from "../axiosWithConfig";

export const getQuiz = async () => {
  try {
    const response = await axiosWithConfig.get("/courses/module/1/quizzes?limit=10&offset=0");

    return response.data;
  } catch (error) {
    throw Error("Failed to get category");
  }
};

export const getQuizById = async (id) => {
    try {
      const response = await axiosWithConfig.get(`/courses/module/1/quizzes/${id}`);
      return response.data;
    } catch (error) {
      throw Error(`Gagal mendapatkan kuis dengan ID ${id}`);
    }
};

export const addQuiz = async (FormData) => {
    try {
      const response = await axiosWithConfig.post("/courses/module/1/quizzes", FormData);
      return response.data;
    } catch (error) {
      throw Error("Failed to add quiz");
    }
};

export const deleteQuiz = async (id) => {
  try {
    const response = await axiosWithConfig.delete(`/courses/module/1/quizzes/${id}`);
    return response.data;
  } catch (error) {
    throw Error("Failed to get category");
  }
}

export const editQuiz = async (id, data) => {
  try {
    const response = await axiosWithConfig.put(`/courses/module/quizzes/${id}`, data);
    return response.data;
  } catch (error) {
    throw Error("Failed to get category");
  }
}