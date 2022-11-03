import { useState, useEffect } from 'react';
import serverNode from '~/api/serverNode';

import FilterList from '../FilterList/FilterList';
import MovieGrid from '../MovieGrid/MovieGrid';
import PageHeader from '../PageHeader/PageHeader';

function Catalog() {
   const [films, setFilms] = useState([]);
   const [activeGenre, setActiveGenre] = useState('All');

   useEffect(() => {
      if (activeGenre !== 'All') {
         const getFilms = async () => {
            const response = await serverNode.getFilmsByGenre(activeGenre);
            setFilms(response.data);
         };
         getFilms();
      }

   }, [activeGenre]);

   return (
      <>
         <PageHeader>
            <FilterList
               activeGenre={activeGenre}
               setActiveGenre={setActiveGenre}
            />
         </PageHeader>
         {
            films.length < 0 ? "No films for this genre" : (
               activeGenre === 'All' ? (
                  <MovieGrid />
               ) : (
                  <div className="section mb-3">
                     <MovieGrid films={films.length !== 0 ? films : null} />
                  </div>
               )
            )
         }
      </>
   );
}

export default Catalog;
