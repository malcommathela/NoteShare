import axios from "axios";

const axiosClient = axios.create({
    // baseURL: "https://noteshare-production-b136.up.railway.app",
    // baseURL: "http://localhost:8080",
    baseURL: "https://note-share-vert.vercel.app"
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
