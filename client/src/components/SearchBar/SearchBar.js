import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './SearchBar.module.scss';
import { SearchIcon } from '../Icons/Icons';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function SearchBar(props) {
   const navigate = useNavigate();

   const [keyword, setKeyWord] = useState('');

   const keywodDebounce = useDebounce(keyword, 800);

   const goToSearch = useCallback(() => {
      if (keyword.trim().length > 0) {
         navigate(`/movie/search/${keyword}`, { replace: true });
      }
   }, [keyword, navigate]);

   useEffect(() => {
      goToSearch();
   }, [keywodDebounce]);

   return (
      <div
         className={keyword.length > 0 ? cx('search', 'active') : cx('search')}
      >
         <input
            type={props.type}
            placeholder="Enter keyword..."
            value={props.value}
            onChange={(e) => setKeyWord(e.target.value)}
         />
         <div className={cx('icon')}>
            <SearchIcon />
         </div>
      </div>
   );
}

export default SearchBar;
