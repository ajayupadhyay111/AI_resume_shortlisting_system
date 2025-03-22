import api from "@/utils/axios"


let accessToken = localStorage.getItem("accessToken");

export const rejectCandidate = async (id:string,attemptId:string) => {
  const response = await api.post(`/user/reject/${id}`,{attemptId},{
    headers:{
        "Authorization": `Bearer ${accessToken}`
    }
  })
  return response.data
}

export const shortlistCandidate = async (id:string,attemptId:string) => {
  const response = await api.post(`/user/shortlist/${id}`,{attemptId},{
    headers:{
        "Authorization": `Bearer ${accessToken}`
    }
  })
  return response.data
}




