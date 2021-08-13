import axios from 'axios';

// const token = 'Bearer ' + localStorage.getItem('userToken');

export const instance = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 1000
});
