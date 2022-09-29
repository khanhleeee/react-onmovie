import { useParams } from 'react-router-dom';

import { category as cate } from '~/api/onmoviedb';
import MovieGrid from '../MovieGrid/MovieGrid';
import PageHeader from '../PageHeader/PageHeader';

function Catalog() {
   const { category } = useParams();

   return (
      <>
         <PageHeader>{category === cate.movie ? 'Movies' : 'Login'}</PageHeader>
         <div className="section mb-3">
            <MovieGrid category={category} />
         </div>
      </>
   );
}

export default Catalog;
