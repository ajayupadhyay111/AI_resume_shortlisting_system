import api from "@/utils/axios"

export const rejectCandidate = async (id:string,attemptId:string) => {
  const response = await api.post(`/user/reject/${id}`,{attemptId})
  return response.data
}

export const shortlistCandidate = async (id:string,attemptId:string) => {
  const response = await api.post(`/user/shortlist/${id}`,{attemptId})
  return response.data
}




