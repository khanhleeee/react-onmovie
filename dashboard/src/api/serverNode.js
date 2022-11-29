import axios from 'axios';
import { apiNode } from './apiConfig';

export const serverNode = {
   checkLogin: async (user) => {
      try {
         const data = await axios.post(apiNode.baseUrl + 'auth/login', user);
         return data;
      } catch (error) {
         return error.response;
      }
   },
   checkRegister: async (user) => {
      try {
         const data = await axios.post(apiNode.baseUrl + 'auth/register', user);
         return data;
      } catch (error) {
         return error.response;
      }
   },
   getMoviesList: async (page, perPage) => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'films?page=' + page + '&perPage=' + perPage);
         return data;
      } catch (error) {
         return error.response;
      }
   },
   getDetailMovie: async (filmID) => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'films/' + filmID);
         return data;
      } catch (error) {
         return error.response;
      }
   },
   editDetailMovie: async (filmID, film) => {
      try {
         const data = await axios.post(apiNode.baseUrl + 'films/' + filmID, film);
         return data;
      } catch (error) {
         return error.response;
      }
   },
   getAllGenres: async () => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'films/genres');
         return data;
      } catch (error) {
         return error.response;
      }
   },
   getAllCasts: async () => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'films/casts');
         return data;
      } catch (error) {
         return error.response;
      }
   },
   getAllKeywords: async () => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'films/keywords');
         return data;
      } catch (error) {
         return error.response;
      }
   },
};

