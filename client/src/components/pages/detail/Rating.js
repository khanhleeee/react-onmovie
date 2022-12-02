import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import serverNode from '~/api/serverNode';
import { LikeIcon, UnlikeIcon } from '~/components/Icons/Icons';

import { MOVIE, MOVIE_RATING, USER } from '~/constants';
import styles from './Detail.module.scss';

const cx = classNames.bind(styles);

/**
 * Did not like yet: 0
 * Like: 1
 * Dislike: 2
 */
export default function Rating({ id }) {
   const [active, setActive] = useState(2);
   const [ratings, setRatings] = useState([]);
   const userData = JSON.parse(localStorage.getItem('user'));

   useEffect(() => {
      const getRating = () => {
         serverNode.getRatingList(userData[USER.id])
            .then((res) => {
               let user_ratings = res.data.data;
               user_ratings.forEach((rating) => {
                  if (rating[MOVIE_RATING.islike]) {
                     rating[MOVIE_RATING.islike] = 1;
                  } else {
                     rating[MOVIE_RATING.islike] = 0;
                  }
               });
               for (let item of user_ratings) {
                  if (item[MOVIE.id].toString() === id) {
                     setActive(item[MOVIE_RATING.islike]);
                  }
               }
               setRatings(user_ratings);
            })
            .catch((err) => {
               console.log(err);
            });
      };
      getRating();
   }, [active]);

   const handleLike = () => {
      serverNode.addRating({
         [MOVIE.id]: id,
         [MOVIE_RATING.islike]: 1,
         [USER.id]: userData[USER.id],
      })
      setRatings([...ratings, { [MOVIE.id]: id, [MOVIE_RATING.islike]: 1, [USER.id]: userData[USER.id] }]);
      setActive(1);
   };

   const handleDisLike = () => {
      serverNode.addRating({
         [MOVIE.id]: id,
         [MOVIE_RATING.islike]: 0,
         [USER.id]: userData[USER.id],
      })
      setRatings([...ratings, { [MOVIE.id]: id, [MOVIE_RATING.islike]: 0, [USER.id]: userData[USER.id] }]);
      setActive(0);
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