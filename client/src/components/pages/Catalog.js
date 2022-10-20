import { useParams } from 'react-router-dom';

import { category as cate } from '~/api/onmoviedb';
import MovieGrid from '../MovieGrid/MovieGrid';
import PageHeader from '../PageHeader/PageHeader';

function Catalog() {
   return (
      <>
         <PageHeader>Movie</PageHeader>
         <div className="section mb-3">
            <MovieGrid category="movie" />
         </div>
      </>
   );
}

export default Catalog;
