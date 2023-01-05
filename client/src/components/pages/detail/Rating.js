import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import serverNode from '~/api/serverNode';
import { LikeIcon, UnlikeIcon } from '~/components/Icons/Icons';

import { MOVIE, MOVIE_RATING, USER } from '~/constants';
import styles from './Detail.module.scss';

const cx = classNames.bind(styles);

/**
 * Like: 1
 * Dislike: 0
 */

export default function Rating({ id }) {
   const [active, setActive] = useState(-1);
   const [ratings, setRatings] = useState([]);

   const userData = JSON.parse(localStorage.getItem('user'));

   useEffect(() => {
      const getRating = async () => {
         const res = await serverNode.getRatingList(userData[USER.id]);
         const user_ratings = res.data.data;
         if (!res.data.data) {
            setRatings([]);
         } else {
            for (let i in user_ratings) {
               if (user_ratings[i][MOVIE.id].toString() === id) {
                  setActive(user_ratings[i][MOVIE_RATING.islike]);
               } else {
                  setActive(-1);
               }
            }
            setRatings(user_ratings);
         }
      };
      getRating();
   }, [active]);

   const handleLike = () => {
      serverNode.addRating({
         [MOVIE.id]: id,
         [MOVIE_RATING.islike]: 1,
         [USER.id]: userData[USER.id],
      });
      if (active == true && active != -1) {
         setActive(-1);
      } else {
         setActive(true);
      }
      console.log('like: ', ratings);
   };

   const handleDisLike = () => {
      serverNode.addRating({
         [MOVIE.id]: id,
         [MOVIE_RATING.islike]: 0,
         [USER.id]: userData[USER.id],
      });
      if (active == false) {
         setActive(-1);
      } else {
         setActive(false);
      }
   };

   return (
      <div className={cx('rating')}>
         <LikeIcon
            classNames={
               active === true && active !== -1
                  ? cx('icon', 'active')
                  : cx('icon')
            }
            onClick={handleLike}
         />
         <UnlikeIcon
            classNames={
               active === false
                  ? cx('icon', 'dislike', 'active')
                  : cx('icon', 'dislike')
            }
            onClick={handleDisLike}
         />
      </div>
   );
}
