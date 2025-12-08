import axios from "axios";

export const http = axios.create({
    baseURL: "http://localhost:5264",
    headers: {
        "Content-Type": "application/json"
    }
});

http.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})