import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

let accessToken = localStorage.getItem("accessToken");

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
    },
});

// Create a new axios instance specifically for refresh token requests
const refreshTokenApi = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error?.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Use the separate instance for refresh token request
                const response = await refreshTokenApi.post("/api/user/refresh-token");
                localStorage.setItem("accessToken", response.data.accessToken);
                api.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
                return api(originalRequest);
            } catch (error) {
                console.log(error)
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default api;