import axios from "axios";

const axiosClient = axios.create({
    // baseURL: "http://localhost:8080" || "https://noteshare-production-b136.up.railway.app",
    baseURL: "https://noteshare-production-b136.up.railway.app",



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
