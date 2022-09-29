import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './MovieGrid.module.scss';
import MovieCard from '../MovieCard/MovieCard';
import onmoviedbApi, { movieType } from '~/api/onmoviedb';
import Button from '../Button/Button';

const cx = classNames.bind(styles);

function MovieGrid(props) {
   const [items, setItems] = useState([]);

   const [page, setPage] = useState(1);
   const [totalPage, setTotalPage] = useState(0);

   const keyword = useParams();

   useEffect(() => {
      const getList = async () => {
         let response = null;
         if (keyword === undefined) {
            const params = {};
            response = await onmoviedbApi.getMovieList(movieType.upcoming, {
               params,
            });
         } else {
            const params = {
               query: keyword.category,
            };
            response = await onmoviedbApi.search(props.category, { params });
         }
         setItems(response.results);
         setTotalPage(response.total_pages);
      };
      getList();
   }, [props.category, keyword]);

   const loadMore = async () => {
      let response = null;
      if (keyword === undefined) {
         const params = {
            page: page + 1,
         };
         response = await onmoviedbApi.getMovieList(movieType.upcoming, {
            params,
         });
      } else {
         const params = {
            page: page + 1,
            query: keyword.category,
         };
         response = await onmoviedbApi.search(props.category, { params });
      }
      setItems([...items, ...response.results]);
      setPage(page + 1);
   };

   return (
      <>
         <div className={cx('movie-grid')}>
            {items.map((item, index) => (
               <MovieCard key={index} category={props.category} item={item} />
            ))}
         </div>
         {page < totalPage && (
            <div className={cx('loadmore')}>
               <Button outline onClick={loadMore}>
                  Load More
               </Button>
            </div>
         )}
      </>
   );
}

export default MovieGrid;
