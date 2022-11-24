import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './MovieGrid.module.scss';
import MovieCard from '../MovieCard/MovieCard';
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
            if (props.films) {
               setItems(props.films.data);
               setPage(props.films.page);
               setTotalPage(props.films.total);
            } else if (keyword === undefined) {
               response = await serverNode.getFilmList(1);
               setItems(response.data.data);
               setTotalPage(response.data.total_pages);
            } else {
               response = await serverNode.searchFilmList(keyword);
               setItems(response.data.data);
               setTotalPage(response.data.total_pages);
            }
         } catch (error) {
            console.error(error);
         }
      };
      getList();
   }, [props.category, keywodDebounce, props.films]);

   const loadMore = async () => {
      let response = null;
      response = await serverNode.getFilmList(page + 1);
      setItems([...items, ...response.data.data]);
      setPage(page + 1);
   };

   return (
      <>
         {!items.length && (
            <h2 className={cx('no-result')}>
               No result for keyword "{keyword}"
            </h2>
         )}
         <div className={cx('movie-grid')}>
            {items.map((item, index) => (
               <MovieCard key={index} category={props.category} item={item} />
            ))}
         </div>
         {page == null
            ? ''
            : page < totalPage && (
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
