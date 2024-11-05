import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:8080" // Đảm bảo sử dụng cổng đúng
});

export default instance;
