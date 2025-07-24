import api from "../utils/axios";

let accessToken = localStorage.getItem("accessToken");

export const uploadResume = async (data: FormData) => {
  const response = await api.post("/api/resume/match", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const getAttempts = async () => {
  const response = await api.get("/api/resume/attempts", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const getCandidatesByAttemptId = async (id: string) => {
  const response = await api.get(`/api/resume/attempt/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
