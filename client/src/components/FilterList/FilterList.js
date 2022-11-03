import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import serverNode from '~/api/serverNode';
import styles from './FilterList.module.scss';

const cx = classNames.bind(styles);

function FilterList({ activeGenre, setActiveGenre }) {
   const [genres, setGenres] = useState([]);

   const itemAll = {
      G_ID: 'All',
      G_NAME: 'All',
   };

   useEffect(() => {
      const getGenres = async () => {
         const response = await serverNode.getGenres();
         setGenres(response.data);
      };
      getGenres();
   }, []);

   return (
      <div className={cx('filter-list')}>
         <span className={cx('lable')}>Category</span>
         <div className={cx('container')}>
            <FilterItem
               item={itemAll}
               onClick={() => setActiveGenre(itemAll.G_ID)}
               isCheck={activeGenre == itemAll.G_ID}
            />
            {genres.map((item, index) => (
               <FilterItem
                  key={index}
                  item={item}
                  onClick={() => setActiveGenre(item.G_ID)}
                  isCheck={activeGenre == item.G_ID}
               />
            ))}
         </div>
      </div>
   );
}

const FilterItem = (props) => {
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

export default FilterList;
