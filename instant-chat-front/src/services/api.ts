import axios from 'axios';

const URL: string = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
	baseURL: URL
});

export default api;
