import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5213/api', // Cambia la URL de tu API según corresponda
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
