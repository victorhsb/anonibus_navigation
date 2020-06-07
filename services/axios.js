import axios from 'axios';

const api = axios.create({
  baseURL: 'https://us-central1-anonibus-e22cb.cloudfunctions.net',
});

export const randomUser = axios.create({
    baseURL: 'https://randomuser.me',
})

export default api;
