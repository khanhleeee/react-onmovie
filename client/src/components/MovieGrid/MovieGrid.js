import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './MovieGrid.module.scss';
import MovieCard from '../MovieCard/MovieCard';
import onmoviedbApi, { movieType } from '~/api/onmoviedb';
import serverNode from '~/api/serverNode';

import Button from '../Button/Button';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function MovieGrid(props) {
   const [items, setItems] = useState([]);

   const [page, setPage] = useState(1);

   const [totalPage, setTotalPage] = useState(0);

   const keyword = props.keyword;
   const keywodDebounce = useDebounce(keyword, 800);

   useEffect(() => {
      const getList = async () => {
         try {
            let response = null;
            if (keyword === undefined) {
               response = await serverNode.getFilmList(1);
               setItems(response.data.data);
            } else {
               response = await serverNode.searchFilmList(keyword);
               setItems(response.data.data);
            }
            setTotalPage(response.data.total_pages);
         } catch (error) {
            console.error(error);
         }
      };
      getList();
   }, [props.category, keywodDebounce]);

   const loadMore = async () => {
      let response = null;
      response = await serverNode.getFilmList(page + 1);
      setItems([...items, ...response.data.data]);
      setPage(page + 1);
      // if (keyword === undefined) {
      //    const params = {
      //       page: page + 1,
      //    };
      //    response = await serverNode.getFilmList(params);
      //    // response = await onmoviedbApi.getMovieList(movieType.upcoming, {
      //    //    params,
      //    // });
      // } else {
      //    const params = {
      //       page: page + 1,
      //       query: keyword.category,
      //    };
      //    response = await onmoviedbApi.search(props.category, { params });
      // }
   };

   return (
      <>
         {!items.length && (
            <h2 className={cx('no-result')}>
               No result for keywod '{keyword}'
            </h2>
         )}
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
