import api from "../utils/axios";

export const uploadResume = async (data: FormData) => {
  const response = await api.post("/api/resume/match", data,{
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const getAttempts = async () => {
  const response = await api.get("/api/resume/attempts");
  return response.data;
};

export const getCandidatesByAttemptId = async (id:string) => {
  const response = await api.get(`/api/resume/attempt/${id}`);
  return response.data;
};
