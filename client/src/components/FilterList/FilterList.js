import classNames from 'classnames/bind';
import styles from './FilterList.module.scss';

const cx = classNames.bind(styles);

function FilterList() {
   return (
      <div className={cx('filter-list')}>
         <span className={cx('lable')}>Category</span>
         <div className={cx('container')}>
            <div className={cx('card')}>Youth</div>
         </div>
      </div>
   );
}

const FilterItem = () => {};

export default FilterList;
