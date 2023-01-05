import { useParams } from 'react-router-dom';

import { category as cate } from '~/api/onmoviedb';
import MovieGrid from '../MovieGrid/MovieGrid';
import PageHeader from '../PageHeader/PageHeader';

function Search() {
   const { keyword } = useParams();

   return (
      <>
         <PageHeader noTitle />
         <div className="section mb-3">
            <MovieGrid category={cate.movie} keyword={keyword} />
         </div>
      </>
   );
}

export default Search;
