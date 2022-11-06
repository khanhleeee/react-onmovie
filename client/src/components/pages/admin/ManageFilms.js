import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Admin.module.scss';

const cx = classNames.bind(styles);

function ManageFilms() {
   const [activePage, setActivePage] = useState('Account');

   return (
      <div>
         <div className={cx('container')}>
            <div className={cx('newFilm-field')}>
               <h3 className={cx('title')}>New film</h3>
               <form className={cx('form')}>
                  <div className={cx('form-group')}>
                     <label>Film name</label>
                     <div className={cx('input')}>
                        <input type="text" />
                     </div>
                  </div>
                  <div className={cx('form-group')}>
                     <label></label>
                     <div className={cx('input')}>
                        <input type="text" />
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export default ManageFilms;
