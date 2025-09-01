// src/config/axiosConfig.js
import axios from 'axios';

// Configura la URL base
const axiosInstance = axios.create({
    baseURL: 'http://192.168.0.105:8000/api',
});

export default axiosInstance;
