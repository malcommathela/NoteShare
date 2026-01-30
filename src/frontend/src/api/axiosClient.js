import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://noteshare-production-b136.up.railway.app" || "http://localhost:8080",
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosClient;
