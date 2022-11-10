import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import onmoviedbApi, { category, movieType } from '~/api/onmoviedb';
import apiConfig from '~/api/apiConfig';
import styles from './HeroSlide.module.scss';
import Button from '../Button/Button';
import serverNode from '~/api/serverNode';

const cx = classNames.bind(styles);

function HeroSlide() {
   SwiperCore.use([Autoplay]);
   const [movieItems, setMovieItems] = useState([]);

   useEffect(() => {
      const getMovies = async () => {
         const params = { page: 1 };
         try {
            const movies = await serverNode.getFilmList(1);
            // const movies = await onmoviedbApi.getMovieList(movieType.popular, {
            //    params,
            // });
            setMovieItems(movies.data.data.slice(0, 6));
         } catch {
            console.error('error');
         }
      };
      getMovies();
   }, []);

   return (
      <div className={cx('hero-slide')}>
         <Swiper
            modules={[Autoplay]}
            grabCursor={true}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 4000 }}
         >
            {movieItems.map((item, index) => (
               <SwiperSlide key={index} className={cx('swiper-slide')}>
                  {({ isActive }) => (
                     <HeroSlideItem
                        item={item}
                        className={isActive ? cx('active') : ''}
                     ></HeroSlideItem>
                  )}
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
}

const HeroSlideItem = (props) => {
   let navigate = useNavigate();

   const item = props.item;

   const background = apiConfig.originalImage(
      item.F_BACKCDROP ? item.F_BACKCDROP : item.poster_path,
   );

   return (
      <div
         className={cx('slide-item', props.className)}
         style={{ backgroundImage: `url(${background})` }}
      >
         <div className={cx('content', 'container')}>
            <div className={cx('info')}>
               <h2 className={cx('title')}>{item.F_OFFICIAL_NAME}</h2>
               <div className={cx('overview')}>{item.F_DESC}</div>
               <div className={cx('btns')}>
                  <Button onClick={() => navigate('/movie/' + item.F_ID)}>
                     See Details
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default HeroSlide;
