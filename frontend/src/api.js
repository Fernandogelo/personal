import axios from 'axios';

// Create an Axios instance with baseURL already including /api
const API = axios.create({
  baseURL: 'http://localhost:5000/api',  // <-- all requests go through /api
  headers: {
    'Content-Type': 'application/json'
  }
});

export default API;
