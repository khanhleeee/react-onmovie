import { useState, useEffect } from 'react';
import serverNode from '~/api/serverNode';

import FilterList from '../FilterList/FilterList';
import MovieGrid from '../MovieGrid/MovieGrid';
import PageHeader from '../PageHeader/PageHeader';

function Catalog() {
   const [films, setFilms] = useState([]);
   const [activeGenre, setActiveGenre] = useState(-1);
   const [activeCountry, setActiveCountry] = useState(-1);

   useEffect(() => {
      let getFilms = null;
      if (activeGenre !== -1 && activeCountry === -1) {
         getFilms = async () => {
            const response = await serverNode.getFilmsByGenre(activeGenre);
            setFilms(response.data);
         };
      } else if (activeGenre === -1 && activeCountry !== -1) {
         getFilms = async () => {
            const response = await serverNode.getFilmsByCountry(activeCountry);
            setFilms(response.data);
         };
      } else {
         getFilms = async () => {
            const response = await serverNode.getFilmsByGenreAndCountry(
               activeGenre,
               activeCountry,
            );
            setFilms(response.data);
         };
      }
      getFilms();
   }, [activeGenre, activeCountry]);

   useEffect(() => {
      if (activeGenre !== -1 && activeCountry !== -1) {
         const getGenreCountryFilms = async () => {
            const response = await serverNode.getFilmsByGenreAndCountry(
               activeGenre,
               activeCountry,
            );
            setFilms(response.data);
         };
         getGenreCountryFilms();
      }
   }, [activeGenre, activeCountry]);

   return (
      <>
         <PageHeader>
            <FilterList
               active={{ activeGenre, activeCountry }}
               setActiveGenre={setActiveGenre}
               setActiveCountry={setActiveCountry}
            />
         </PageHeader>
         {<MovieGrid films={films.length !== 0 ? films : null} />}
      </>
   );
}

export default Catalog;
