import axios from "axios";

const API = axios.create({
    baseURL: 'https://gaskuy-backend.onrender.com/api/v1',
});

// Interceptor to attach token if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

