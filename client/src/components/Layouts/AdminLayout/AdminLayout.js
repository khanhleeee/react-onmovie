import classNames from 'classnames/bind';
import { useState } from 'react';
import { DashBoardIcon, LogoutIcon } from '~/components/Icons/Icons';

import styles from './AdminLayout.module.scss';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
   const [active, setActive] = useState('film');

   return (
      <div className={cx('main')}>
         <div className={cx('sidebar')}>
            <ul className={cx('menu')}>
               <li
                  onClick={() => setActive('film')}
                  className={active == 'film' ? cx('active') : ''}
               >
                  <DashBoardIcon classNames={cx('icon')} />
                  <span>Films</span>
               </li>
               <li
                  onClick={() => setActive('logout')}
                  className={active == 'logout' ? cx('active') : ''}
               >
                  <LogoutIcon classNames={cx('icon')} />
                  <span>Logout</span>
               </li>
            </ul>
         </div>
         <div className={cx('content')}>{children}</div>
      </div>
   );
}

export default AdminLayout;
