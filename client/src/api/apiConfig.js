const apiConfig = {
   baseUrl: 'https://api.themoviedb.org/3/',
   apiKey: 'c30c86db151358f645d9d34f247a67d1',
   originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
   w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;

export const apiNode = {
   baseUrl: 'http://localhost:4000/',
};
