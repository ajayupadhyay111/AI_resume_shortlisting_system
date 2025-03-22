import api from "../utils/axios";

type RegisterData = {
    name: string;
    email: string;
    password: string;
  }

type LoginData = {
  email: string;
  password: string;
}
  type ProfilePic = {
    profilePicture: File;
  
  }

// export const profileUpload = async (data:ProfilePic) => {
//   const response = await api.post("/auth/profile-upload", data);
//   return response.data;
// };

export const register = async (data: RegisterData) => {
  const response = await api.post("/api/user/register", data);
  return response.data;
};

export const login = async (data: LoginData) => {
  const response = await api.post("/api/user/login", data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/api/user/logout");
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get(`/api/user/profile`);
  return response.data;
};
