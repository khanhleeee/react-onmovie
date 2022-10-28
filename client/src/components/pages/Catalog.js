import { useParams } from 'react-router-dom';

import { category as cate } from '~/api/onmoviedb';
import FilterList from '../FilterList/FilterList';
import MovieGrid from '../MovieGrid/MovieGrid';
import PageHeader from '../PageHeader/PageHeader';

function Catalog() {
   return (
      <>
         <PageHeader>
            <FilterList />
         </PageHeader>
         <div className="section mb-3">
            <MovieGrid category="movie" />
         </div>
      </>
   );
}

export default Catalog;
