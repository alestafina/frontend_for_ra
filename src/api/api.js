import axios from 'axios';

// axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "http://217.71.129.139:5041", 
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;