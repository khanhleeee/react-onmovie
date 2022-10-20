import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import onmoviedbApi, { category, movieType } from '~/api/onmoviedb';
import apiConfig from '~/api/apiConfig';
import styles from './HeroSlide.module.scss';
import Button from '../Button/Button';

const cx = classNames.bind(styles);

function HeroSlide() {
   SwiperCore.use([Autoplay]);
   const [movieItems, setMovieItems] = useState([]);

   useEffect(() => {
      const getMovies = async () => {
         const params = { page: 1 };
         try {
            const movies = await onmoviedbApi.getMovieList(movieType.popular, {
               params,
            });
            setMovieItems(movies.results.slice(8, 20));
         } catch {
            console.log('error');
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
      item.backdrop_path ? item.backdrop_path : item.poster_path,
   );

   // const [trailers, setTrailer] = useState([]);
   // useEffect(() => {
   //    const getVideo = async () => {
   //       const videos = await onmoviedbApi.getVideo(category.movie, item.id);

   //       if (videos.results.length > 0) {
   //          setTrailer(videos.results.slice(0, 2));
   //       }
   //    };
   //    getVideo();
   // }, [item.id]);

   return (
      <div
         className={cx('slide-item', props.className)}
         style={{ backgroundImage: `url(${background})` }}
      >
         <div className={cx('content', 'container')}>
            <div className={cx('info')}>
               <h2 className={cx('title')}>{item.title}</h2>
               <div className={cx('overview')}>{item.overview}</div>
               <div className={cx('btns')}>
                  <Button onClick={() => navigate('/movie/' + item.id)}>
                     See Details
                  </Button>
               </div>
            </div>
            {/* <div className={cx('poster')}>
               <img src={apiConfig.w500Image(item.poster_path)} alt="" />
            </div> */}
         </div>
      </div>
   );
};

export default HeroSlide;
