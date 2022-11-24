import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { MOVIE, GENRE, COUNTRY } from '~/constants';
import serverNode from '~/api/serverNode';
import styles from './FilterList.module.scss';

const cx = classNames.bind(styles);

const itemGenreAll = {
   [GENRE.id]: -1,
   [GENRE.name]: 'All',
};

const itemCountryAll = {
   [COUNTRY.id]: -1,
   [COUNTRY.name]: 'All',
};

export default function FilterList({
   active,
   setActiveGenre,
   setActiveCountry,
}) {
   const [genres, setGenres] = useState([]);
   const [coutries, setCountries] = useState([]);

   useEffect(() => {
      const getGenres = async () => {
         const response = await serverNode.getGenres();
         setGenres(response.data);
      };
      getGenres();
      const getContries = async () => {
         const response = await serverNode.getContries();
         setCountries(response.data);
      };
      getContries();
   }, []);

   return (
      <>
         <div className={cx('filter-list')}>
            <span className={cx('lable')}>Category</span>
            <div className={cx('container')}>
               <FilterItemGenre
                  item={itemGenreAll}
                  onClick={() => setActiveGenre(itemGenreAll[GENRE.id])}
                  isCheck={active.activeGenre === itemGenreAll[GENRE.id]}
               />
               {genres.map((item, index) => (
                  <FilterItemGenre
                     key={index}
                     item={item}
                     onClick={() => setActiveGenre(item[GENRE.id])}
                     isCheck={active.activeGenre === item[GENRE.id]}
                  />
               ))}
            </div>
         </div>
         <div className={cx('filter-list')}>
            <span className={cx('lable')}>Country</span>
            <div className={cx('container')}>
               <FilterItemCountry
                  item={itemCountryAll}
                  onClick={() => setActiveCountry(itemCountryAll[COUNTRY.id])}
                  isCheck={active.activeCountry === itemCountryAll[COUNTRY.id]}
               />
               {coutries.map((item, index) => (
                  <FilterItemCountry
                     key={index}
                     item={item}
                     onClick={() => setActiveCountry(item[COUNTRY.id])}
                     isCheck={active.activeCountry === item[COUNTRY.id]}
                  />
               ))}
            </div>
         </div>
      </>
   );
}

const FilterItemGenre = (props) => {
   const item = props.item;
   return (
      <div
         onClick={props.onClick ? props.onClick : null}
         className={props.isCheck ? cx('card', 'checked') : cx('card')}
      >
         {item[GENRE.name]}
      </div>
   );
};

const FilterItemCountry = (props) => {
   const item = props.item;
   return (
      <div
         onClick={props.onClick ? props.onClick : null}
         className={props.isCheck ? cx('card', 'checked') : cx('card')}
      >
         {item[COUNTRY.name]}
      </div>
   );
};
