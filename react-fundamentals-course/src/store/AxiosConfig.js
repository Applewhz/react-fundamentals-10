import axios from "axios";

const baseURL = 'http://localhost:4000/';
let headers = {};

if (localStorage.token) {
    headers.Authorization = localStorage.token.replace('Bearer', '').trim()
}

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers,
});

export default axiosInstance