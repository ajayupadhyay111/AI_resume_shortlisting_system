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

export const profileUpload = async (data:ProfilePic) => {
  const response = await api.post("/auth/profile-upload", data);
  return response.data;
};

export const register = async (data: RegisterData) => {
  const response = await api.post("/user/register", data);
  return response.data;
};

export const login = async (data: LoginData) => {
  const response = await api.post("/user/login", data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get(`/user/profile`);
  return response.data;
};
