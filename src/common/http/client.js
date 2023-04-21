import axios from 'axios';

// axios 객체 만드는 것
export const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})
