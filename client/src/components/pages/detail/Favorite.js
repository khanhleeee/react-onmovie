import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { HeartIcon } from '~/components/Icons/Icons';
import styles from './Detail.module.scss';

const cx = classNames.bind(styles);

//Fake data
const user_watchlist = ['00003', '00001', '020123'];

function Favorite({ id }) {
   const [active, setActive] = useState(false);
   const [watchlist, setWatchlist] = useState([]);

   useEffect(() => {
      const getWatchlist = () => {
         if (user_watchlist.includes(id)) setActive(true);
         setWatchlist(user_watchlist);
      };
      getWatchlist();
   }, [active]);

   // console.log('Active: ', active, 'List: ', watchlist);
   const handleAddToFavorite = () => {
      if (active) {
         watchlist.splice(watchlist.indexOf(id), 1);
         setWatchlist(watchlist);
         setActive(false);
         console.log('xoa', watchlist);
      } else {
         setWatchlist(watchlist.push(id));
         setActive(true);
         console.log('them', watchlist);
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
