import axios from 'axios';

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api`;
console.log("API Base URL:", baseURL);

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api',
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const { response } = error;
    if (response && response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN');
    } else if (response && response.status === 404) {
        alert('Not Found');
    }
    return Promise.reject(error);
});

export default axiosClient;

export const getDepartments = () => {
    return axiosClient.get("/departments").then(({ data }) => data.data);
  };

export const getPositions = () => {
    return axiosClient.get("/positions").then(({ data }) => data.data);
  };

export const getCategories = () => {
    return axiosClient.get("/categories").then(({ data }) => data.data);
  };

export const getItems = () => {
    return axiosClient.get("/items").then(({ data }) => data.data);
  };

export const getSuppliers = () => {
    return axiosClient.get("/suppliers").then(({ data }) => data.data);
  };

