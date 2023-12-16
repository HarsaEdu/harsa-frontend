import axiosWithConfig from "../axiosWithConfig";

export const getHistoryQuiz = async (params, idQuiz) => {
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

  const url = query
    ? `/courses/quizzes/${idQuiz}/history-quiz?&${query}`
    : `/courses/quizzes/${idQuiz}/history-quiz?offset=0&limit=10`;

  try {
    const response = await axiosWithConfig.get(url);

    return response.data;
  } catch (error) {
    throw Error("Failed to get class");
  }
};
