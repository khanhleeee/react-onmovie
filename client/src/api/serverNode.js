import axios from 'axios';
import { apiNode } from './apiConfig';

const serverNode = {
   getFilmList: async (page) => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'film?page=' + page);
         return data;
      } catch (error) {
         console.log(error);
      }
   },
   searchFilmList: async (keyword) => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'film/search?q=' + keyword);
         return data;
      } catch (error) {
         console.log(error);
      }
   },
   getFilmDetail: async (id) => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'film/' + id);
         return data;
      } catch (error) {
         console.log(error);
      }
   },
   getSimilarFilm: async (id) => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'film/' + id + '/similar');
         return data;
      } catch (error) {
         console.log(error);
      }
   },
   getActorFilm: async (id) => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'film/actor/' + id);
         return data;
      } catch (error) {
         console.log(error);
      }
   },
   getGenres: async () => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'film/genres');
         return data;
      } catch (error) {
         console.log(error);
      }
   },
   getContries: async () => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'film/countries');
         return data;
      } catch (error) {
         console.log(error);
      }
   },
   getFilmsByGenre: async (genre) => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'film/genres/' + genre);
         return data;
      } catch (error) {
         console.log(error);
      }         
   },
   getFilmsByCountry: async (country) => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'film/countries/' + country);
         return data;
      } catch (error) {
         console.log(error);
      }         
   },
   getFilmsByGenreAndCountry: async (genre, country) => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'film/filter/?g=' + genre + '&c=' + country);
         return data;
      } catch (error) {
         console.log(error);
      }
   },
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
   upgradeUser: async (id, data) => {
      try {
         const response = await axios.put(
            apiNode.baseUrl + 'auth/update/' + id,
            data,
         );
         return response;
      } catch (error) {
         return error.response;
      }
   },
   getWatchList: async (id) => {
      try {
         const data = await axios.get(
            apiNode.baseUrl + 'user/getWatchList/' + id,
         );
         return data;
      } catch (error) {
         return error.response;
      }
   },
   addWatchList: async (data) => {
      try {
         const response = await axios.post(
            apiNode.baseUrl + 'user/addWatchList',
            data,
         );
         return response;
      } catch (error) {
         return error.response;
      }
   },
   removeWatchList: async (data) => {
      try {
         const response = await axios.post(
            apiNode.baseUrl + 'user/removeWatchList',
            data,
         );
         return response;
      } catch (error) {
         return error.response;
      }
   },
};

export default serverNode;
