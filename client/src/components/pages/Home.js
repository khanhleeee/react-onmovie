import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import HeroSlide from '../HeroSlide/HeroSlide';
import MovieList from '../MovieList/MovieList';

import { category, movieType } from '~/api/onmoviedb';

function Home() {
   return (
      <div>
         <HeroSlide />
         <div className="container">
            <div className="section mb-3">
               <div className="section-header mb-2">
                  <h2>Top Rated Movies</h2>
                  <Link to="/movie">
                     {/* <Button outline>View more</Button> */}
                  </Link>
               </div>
               <MovieList category={category.movie} type={movieType.popular} />
            </div>
            <div className="section mb-3">
               <div className="section-header mb-2">
                  <h2>Top Favorite Movies</h2>
                  <Link to="/movie">
                     {/* <Button outline>View more</Button> */}
                  </Link>
               </div>
               <MovieList
                  category={category.movie}
                  type={movieType.top_rated}
               />
            </div>
         </div>
      </div>
   );
}

export default Home;
