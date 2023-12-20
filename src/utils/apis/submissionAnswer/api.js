import axiosWithConfig from "../axiosWithConfig";

export const getAllSubmissionAnswers = async (params, idSubmission) => {
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

    const url = query
      ? `/courses/submissions/${idSubmission}/submission-answer?&${query}`
      : `/courses/submissions/${idSubmission}/submission-answer?offset=0&limit=10`;

    const response = await axiosWithConfig.get(url);
    return response.data;
  } catch (error) {
    throw Error("Failed to get submission answer");
  }
};

export const exportAllSubmissionAnswers = async (idSubmission) => {
  try {
    const response = await axiosWithConfig.get(
      `/courses/submissions/${idSubmission}/submission-answer?offset=0&limit=999999999`,
    );
    return response.data;
  } catch (error) {
    throw Error("Failed to get submission answer");
  }
};

export const getSubmissionAnswerById = async (
  idSubmission,
  idSubmissionAnswer,
) => {
  try {
    const response = await axiosWithConfig.get(
      `/courses/submissions/${idSubmission}/submission-answer/${idSubmissionAnswer}`,
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to get submission answer");
  }
};

export const updateStatusSubmission = async (
  idSubmission,
  idSubmissionAnswer,
  data,
) => {
  try {
    const response = await axiosWithConfig.patch(
      `/courses/submissions/${idSubmission}/submission-answer/${idSubmissionAnswer}`,
      data,
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to update status submission answer");
  }
};
