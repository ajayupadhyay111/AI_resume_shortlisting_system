import axios from "axios";

const API_URL = "https://ai-resume-shortlisting-system.onrender.com/api";

let accessToken = localStorage.getItem("accessToken");
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
    },
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response  = await api.post("/user/refresh-token");
                localStorage.setItem("accessToken", response.data.accessToken);
                api.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
                return api(originalRequest);
            } catch (error) {
                console.log("Error in refresh token", error);
            }
        }
        return Promise.reject(error);
    }
);




export default api;
