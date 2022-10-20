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
  getActorFilm: async (id) => {
    const data = await axios.get(apiNode.baseUrl + 'film/actor/' + id);
    return data
  }
};

export default serverNode;