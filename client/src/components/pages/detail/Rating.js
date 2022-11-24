import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { LikeIcon, UnlikeIcon } from '~/components/Icons/Icons';

import { MOVIE, MOVIE_RATING } from '~/constants';
import styles from './Detail.module.scss';

const cx = classNames.bind(styles);

/**
 * Did not like yet: 0
 * Like: 1
 * Dislike: 2
 */
const user_ratings = [
   {
      F_ID: '00003',
      ISLIKE: 1,
   },
   {
      F_ID: '00004',
      ISLIKE: 0,
   },
   {
      F_ID: '00001',
      ISLIKE: 1,
   },
];

function Rating({ id }) {
   const [active, setActive] = useState(false);
   const [ratings, setRatings] = useState(0);

   useEffect(() => {
      // Lấy dữ liệu ratings của user
      for (let item of user_ratings) {
         if (item[MOVIE.id] === id) {
            setActive(item[MOVIE_RATING.islike]);
         }
      }
      setRatings(user_ratings);
   }, [active]);

   const handleLike = () => {
      if (!active) {
         // Goi procedure them like vao film
         setRatings(ratings.push({ [MOVIE.id]: id, [MOVIE_RATING.islike]: 1 }));
         setActive(1);
      } else if (active === 1) {
         for (let i in ratings) {
            if (ratings[i][MOVIE.id] === id) {
               ratings.splice(ratings.indexOf(id), 1);
            }
         }
         setRatings(ratings);
         setActive(false);
      } else {
         for (let item of ratings) {
            if (item[MOVIE.id] === id) {
               item[MOVIE_RATING.islike] = 0;
            }
         }
         setActive(0);
      }
   };
   const handleDisLike = () => {
      if (!active) {
         // Goi procedure them like vao film
         setRatings(ratings.push({ [MOVIE.id]: id, [MOVIE_RATING.islike]: 0 }));
         setActive(0);
      } else if (active === 0) {
         for (let i in ratings) {
            if (ratings[i][MOVIE.id] === id) {
               ratings.splice(ratings.indexOf(id), 1);
            }
         }
         setRatings(ratings);
         setActive(false);
      } else {
         for (let item of ratings) {
            if (item[MOVIE.id] === id) {
               item[MOVIE_RATING.islike] = 0;
            }
         }
         setActive(0);
      }
   };

   return (
      <div className={cx('rating')}>
         <LikeIcon
            classNames={active === 1 ? cx('icon', 'active') : cx('icon')}
            onClick={handleLike}
         />
         <UnlikeIcon
            classNames={
               active === 0
                  ? cx('icon', 'dislike', 'active')
                  : cx('icon', 'dislike')
            }
            onClick={handleDisLike}
         />
      </div>
   );
}

export default Rating;
