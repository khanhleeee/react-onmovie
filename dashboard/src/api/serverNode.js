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
   addMovie: async (film) => {
      try {
         const data = await axios.post(apiNode.baseUrl + 'films', {film});
         return data;
      } catch (error) {
         return error.response;
      }
   },

   // GENRES
   getAllGenres: async () => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'films/genres');
         return data;
      } catch (error) {
         return error.response;
      }
   },
   addGenreMovie: async (filmID, genre) => {
      try {
         const data = await axios.post(apiNode.baseUrl + 'films/genres/' + filmID, {genre});
         return data;
      } catch (error) {
         return error.response;
      }
   },
   getGenreMovie: async (filmID) => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'films/' + filmID + '/genres');
         return data;
      } catch (error) {
         return error.response;
      }
   },
   removieGenreMovie: async (filmID, genre) => {
      try {
         const data = await axios.post(apiNode.baseUrl + 'films/genres/' + filmID + '/remove', {genre});
         return data;
      } catch (error) {
         return error.response;
      }
   },

   // CASTS
   getAllCasts: async () => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'films/casts');
         return data;
      } catch (error) {
         return error.response;
      }
   },
   getCastMovie: async (filmID) => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'films/' + filmID + '/casts');
         return data;
      } catch (error) {
         return error.response;
      }
   },
   addCastMovie: async (filmID, cast) => {
      try {
         const data = await axios.post(apiNode.baseUrl + 'films/casts/' + filmID, {cast});
         return data;
      } catch (error) {
         return error.response;
      }
   },
   removeCastMovie: async (filmID, cast) => {
      try {
         const data = await axios.post(apiNode.baseUrl + 'films/casts/' + filmID + '/remove', {cast});
         return data;
      } catch (error) {
         return error.response;
      }
   },

   // KEYWORDS
   getAllKeywords: async () => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'films/keywords');
         return data;
      } catch (error) {
         return error.response;
      }
   },
   getKeywordMovie: async (filmID) => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'films/' + filmID + '/keywords');
         return data;
      } catch (error) {
         return error.response;
      }
   },
   addKeywordMovie: async (filmID, keyword) => {
      try {
         const data = await axios.post(apiNode.baseUrl + 'films/keywords/' + filmID, {keyword});
         return data;
      } catch (error) {
         return error.response;
      }
   },
   removeKeywordMovie: async (filmID, keyword) => {
      try {
         const data = await axios.post(apiNode.baseUrl + 'films/keywords/' + filmID + '/remove', {keyword});
         return data;
      } catch (error) {
         return error.response;
      }
   },

   getAllCountries: async () => {
      try {
         const data = await axios.get(apiNode.baseUrl + 'films/countries');
         return data;
      } catch (error) {
         return error.response;
      }
   },


};

