import axios from "axios";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  } else {
    return null;
  }
};

export const client = axios.create({
  baseURL: process.env.BASE_URL,
});

console.log(process.env.BASE_URL);

client.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
