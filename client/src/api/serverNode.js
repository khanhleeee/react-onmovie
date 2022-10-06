import axios from 'axios';
import { apiNode } from './apiConfig';

const serverNode = {
  getFilmList: () => {
    const data = axios.get(apiNode.baseUrl + 'films');
    return data;
  },
};

export default serverNode;