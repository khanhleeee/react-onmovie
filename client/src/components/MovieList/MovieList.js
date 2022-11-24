import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './MovieList.module.scss';
import MovieCard from '../MovieCard/MovieCard';
import serverNode from '~/api/serverNode';

const cx = classNames.bind(styles);

function MovieList(props) {
   const [items, setItems] = useState([]);

   useEffect(() => {
      const getList = async () => {
         let response = null;
         try {
            response = await serverNode.getFilmList();
            setItems(response.data.data);

            if (props.type === 'similar') {
               const similarFilm = await serverNode.getSimilarFilm(props.id);
               setItems(similarFilm.data.data);
            }
         } catch (error) {
            console.error(error);
         }
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
