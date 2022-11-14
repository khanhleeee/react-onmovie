import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import serverNode from '~/api/serverNode';
import styles from './FilterList.module.scss';

const cx = classNames.bind(styles);

function FilterList({ activeGenre, setActiveGenre }) {
   const [genres, setGenres] = useState([]);
   const [coutries, setCountries] = useState([]);

   /*
   nay t moi them phan filter country ne
   co tao api getFilmByCountry roi a trong serverNode
   ---> co gi sua lai cai filter list them country nha
    */

   const itemGenreAll = {
      G_ID: 'All',
      G_NAME: 'All',
   };

   const itemCountryAll = {
      C_ID: 'All',
      C_NAME: 'All',
   };

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
                  onClick={() => setActiveGenre(itemGenreAll.G_ID)}
                  isCheck={activeGenre === itemGenreAll.G_ID}
               />
               {genres.map((item, index) => (
                  <FilterItemGenre
                     key={index}
                     item={item}
                     onClick={() => setActiveGenre(item.G_ID)}
                     isCheck={activeGenre === item.G_ID}
                  />
               ))}
            </div>
         </div>
         <div className={cx('filter-list')}>
            <span className={cx('lable')}>Country</span>
            <div className={cx('container')}>
               <FilterItemCountry
                  item={itemCountryAll}
                  onClick={() => setActiveGenre(itemCountryAll.C_ID)}
                  isCheck={activeGenre === itemCountryAll.C_ID}
               />
               {coutries.map((item, index) => (
                  <FilterItemCountry
                     key={index}
                     item={item}
                     onClick={() => setActiveGenre(item.C_ID)}
                     isCheck={activeGenre === item.C_ID}
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
         {item.G_NAME}
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
         {item.C_NAME}
      </div>
   );
};

export default FilterList;
