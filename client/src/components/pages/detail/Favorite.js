import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import serverNode from '~/api/serverNode';

import { HeartIcon } from '~/components/Icons/Icons';
import { MOVIE, USER } from '~/constants';
import styles from './Detail.module.scss';

const cx = classNames.bind(styles);

function Favorite({ id }) {
   const [active, setActive] = useState(false);
   const [watchlist, setWatchlist] = useState([]);

   const userData = JSON.parse(localStorage.getItem('user'));

   useEffect(() => {
      const getUserWatchlist = () => {
         serverNode
            .getWatchList(userData[USER.id])
            .then((res) => {
               const user_watchlist = res.data.data;
               if (user_watchlist) {
                  user_watchlist.forEach((watchlist) => {
                     if (watchlist[MOVIE.id] == id) {
                        setActive(true);
                     }
                  });
               }
               setWatchlist(user_watchlist);
            })
            .catch((err) => {
               console.log(err);
            });
      };
      getUserWatchlist();
      console.log(id);
   }, [id]);

   const handleAddToFavorite = () => {
      if (active) {
         serverNode
            .removeWatchList({ [USER.id]: userData[USER.id], [MOVIE.id]: id })
            .then((res) => {
               watchlist.splice(watchlist.indexOf(id), 1);
               setWatchlist(watchlist);
               setActive(false);
            })
            .catch((err) => {
               console.log(err);
            });
      } else {
         serverNode
            .addWatchList({ [MOVIE.id]: id, [USER.id]: userData[USER.id] })
            .then((res) => {
               setWatchlist(res.data[MOVIE.id]);
               setActive(true);
            })
            .catch((err) => {
               console.log(err);
            });
      }
   };

   return (
      <div className={cx('favorite')}>
         <HeartIcon
            classNames={active ? cx('icon', 'active') : cx('icon')}
            onClick={handleAddToFavorite}
         />
      </div>
   );
}

export default Favorite;
