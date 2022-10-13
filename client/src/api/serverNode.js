import axios from 'axios';
import { apiNode } from './apiConfig';

const serverNode = {
  getFilmList: async (page) => {
    const data = await axios.get(apiNode.baseUrl + 'film?page=' + page);
    return data
  },
  searchFilmList: async (keyword) => {
    const data = await axios.get(apiNode.baseUrl + 'film/search?q=' + keyword);
    console.log(data);
    return data
  }
};

export default serverNode;