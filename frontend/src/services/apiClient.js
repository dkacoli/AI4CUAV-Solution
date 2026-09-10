import axios from "axios";

// Single shared HTTP client for every service module — one base URL, one
// place to attach the auth token, instead of each service re-reading
// import.meta.env and building headers by hand.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Stored token is missing/expired/invalid — drop it so the UI
      // stops sending it and the next protected navigation redirects to /login.
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
