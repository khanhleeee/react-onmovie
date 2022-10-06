import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './MovieList.module.scss';
import onmoviedbApi, { category } from '~/api/onmoviedb';
import apiConfig from '~/api/apiConfig';
import MovieCard from '../MovieCard/MovieCard';
import serverNode from '~/api/serverNode';

const cx = classNames.bind(styles);

function MovieList(props) {
   const [items, setItems] = useState([]);

   useEffect(() => {
      const getList = async () => {
         let response = null;
         const params = {};
         response = await serverNode.getFilmList();
         setItems(response.data);
         // if (props.type !== 'similar') {
         //    switch (props.category) {
         //       case category.movie:
         //          response = await onmoviedbApi.getMovieList(props.type, {
         //             params,
         //          });
         //          break;
         //       default:
         //          response = await onmoviedbApi.getMovieList(props.type, {
         //             params,
         //          });
         //    }
         // } else {
         //    response = await onmoviedbApi.similar(props.category, props.id);
         // }
         // setItems(response.results);
      };

      getList();
   }, []);
   return (
      <div className={cx('movie-list')}>
         <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
            {items.map((item, index) => (
               <SwiperSlide key={index} className={cx('swiper-slide')}>
                  <MovieCard item={item} category={props.category} />
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
}

export default MovieList;
