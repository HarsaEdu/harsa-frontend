import axiosWithConfig from "../axiosWithConfig";

export const getAllQuiz = async (params, idModul) => {
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
    ? `/courses/module/${idModul}/quizzes?&${query}`
    : `/courses/module/${idModul}/quizzes?limit=10&offset=0`;

  try {
    const response = await axiosWithConfig.get(url);

    return response.data;
  } catch (error) {
    throw Error("Failed to get class");
  }
};

export const getQuizById = async (idQuiz) => {
  try {
    const response = await axiosWithConfig.get(
      `https://api.harsaedu.my.id/web/courses/module/quizzes/${idQuiz}`,
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to get class");
  }
};
