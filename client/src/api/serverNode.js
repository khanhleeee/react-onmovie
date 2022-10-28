import axios from 'axios';
import { apiNode } from './apiConfig';

const serverNode = {
  getFilmList: async (page) => {
    const data = await axios.get(apiNode.baseUrl + 'film?page=' + page);
    return data
  },
  searchFilmList: async (keyword) => {
    const data = await axios.get(apiNode.baseUrl + 'film/search?q=' + keyword);
    return data
  },
  getFilmDetail: async (id) => {
    const data = await axios.get(apiNode.baseUrl + 'film/' + id);
    return data
  },
  getSimilarFilm: async (id) => {
    const data = await axios.get(apiNode.baseUrl + 'film/' + id + '/similar');
    return data
  },
  getActorFilm: async (id) => {
    const data = await axios.get(apiNode.baseUrl + 'film/actor/' + id);
    return data
  },
  checkLogin: async (user) => {
    try {
      const data = await axios.post(apiNode.baseUrl + 'auth/login', user);
      return data
    } catch (error) {
      return error.response;
    }
  },
  checkRegister: async (user) => {
    try {
      const data = await axios.post(apiNode.baseUrl + 'auth/register', user);
      return data
    } catch (error) {
      return error.response;
    }
  }
};

export default serverNode;