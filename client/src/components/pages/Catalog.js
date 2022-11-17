import { useState, useEffect } from 'react';
import serverNode from '~/api/serverNode';

import FilterList from '../FilterList/FilterList';
import MovieGrid from '../MovieGrid/MovieGrid';
import PageHeader from '../PageHeader/PageHeader';

function Catalog() {
   const [films, setFilms] = useState([]);
   const [activeGenre, setActiveGenre] = useState('AllGenre');
   const [activeCountry, setActiveCountry] = useState('AllCountry');

   useEffect(() => {
      if (activeGenre !== 'AllGenre') {
         const getGenreFilms = async () => {
            const response = await serverNode.getFilmsByGenre(activeGenre);
            setFilms(response.data);
         };
         getGenreFilms();
      }
   }, [activeGenre]);

   useEffect(() => {
      if (activeCountry !== 'AllCountry') {
         const getCountryFilms = async () => {
            const response = await serverNode.getFilmsByCountry(activeCountry);
            setFilms(response.data);
         };
         getCountryFilms();
      }
   }, [activeCountry]);

   useEffect(() => {
      if (activeGenre !== 'AllGenre' && activeCountry !== 'AllCountry') {
         const getGenreCountryFilms = async () => {
            const response = await serverNode.getFilmsByGenreAndCountry(
               activeGenre,
               activeCountry
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
         {
            <MovieGrid
               films={films.length !== 0 ? films : null}
            />
         }
      </>
   );
}

export default Catalog;
