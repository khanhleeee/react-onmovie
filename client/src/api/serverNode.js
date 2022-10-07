import axios from 'axios';
import { apiNode } from './apiConfig';

const serverNode = {
  getFilmList: async (page) => {
    const data = await axios.get(apiNode.baseUrl + 'films?page=' + page);
    return data
  },
};

export default serverNode;