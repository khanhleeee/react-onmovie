import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import serverNode from '~/api/serverNode';

import { HeartIcon } from '~/components/Icons/Icons';
import styles from './Detail.module.scss';

const cx = classNames.bind(styles);

function Favorite({ id }) {
   const [active, setActive] = useState(false);
   const [watchlist, setWatchlist] = useState([]);

   useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('user'));

      console.log(userData.data);
      const getUserWatchlist = () => {
         serverNode
            .getWatchList(userData.id)
            .then((res) => {
               const user_watchlist = res.data.data
               user_watchlist.forEach((watchlist) => {
                  if (watchlist.F_ID === id) {
                     setActive(true);
                  }
               })
               setWatchlist(user_watchlist);
            })
            .catch((err) => {
               console.log(err);
            });
      };
      getUserWatchlist();
   }, [active]);

   const handleAddToFavorite = () => {
      if (active) {
         const userData = JSON.parse(localStorage.getItem('user'));
         serverNode
            .removeWatchList({ U_ID: userData.id, F_ID: id })
            .then((res) => {
               watchlist.splice(watchlist.indexOf(id), 1);
               setWatchlist(watchlist);
               setActive(false);
            })
            .catch((err) => {
               console.log(err);
            });
      } else {
         const userData = JSON.parse(localStorage.getItem('user'));
         serverNode
            .addWatchList({ F_ID: id, U_ID: userData.id })
            .then((res) => {
               setWatchlist(res.data.F_ID);
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
