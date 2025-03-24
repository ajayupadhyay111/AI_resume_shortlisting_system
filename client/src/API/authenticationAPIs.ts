import api from "../utils/axios";

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

type updateDate = {
  name: string;
  email: string;
};
// type ProfilePic = {
//   profilePicture: File;
// };

// export const profileUpload = async (data:ProfilePic) => {
//   const response = await api.post("/auth/profile-upload", data);
//   return response.data;
// };

export const register = async (data: RegisterData) => {
  const response = await api.post("/api/user/register", data);
  return response.data;
};
export const verifyEmail = async (email: string, otp: string) => {
  try {
    const response = await api.post("/api/user/verifyEmail", { email, otp });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = async () => {
  const response = await api.delete("/api/users/delete-account");
  return response.data;
};

export const login = async (data: LoginData) => {
  const response = await api.post("/api/user/login", data);
  return response.data;
};

export const googleAuthLogin = async (code: string) => {
    const response = await api.get(`/api/user/google?code=${code}`);
    return response.data
}; 

export const forgotPassword = async (email: string) => {
  const response = await api.post("/api/user/forgot-password", { email });
  return response.data;
};
export const resetPassword = async (
  forgotPasswordToken: string,
  newPassword: string
) => {
  const response = await api.put(
    `/api/user/reset-password/${forgotPasswordToken}`,
    {
      newPassword,
    }
  );
  return response.data;
};
export const updateProfile = async (data: updateDate) => {
  const response = await api.put("/api/user/updateUser", data);
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
