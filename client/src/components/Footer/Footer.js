import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
   return (
      <div className={cx('footer')}>
         <div className={cx('content', 'container')}>
            <div className="logo">
               <h3>on</h3>
               <h3>Movie</h3>
            </div>
            <div className={cx('menus')}>
               <div className={cx('menu')}>
                  <Link to="/">Home</Link>
                  <Link to="/">Movies</Link>
                  <Link to="/">Contact us</Link>
               </div>
               <div className={cx('menu')}>
                  <Link to="/">Media Center</Link>
                  <Link to="/">Terms of Use</Link>
                  <Link to="/">Only on onMovie</Link>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Footer;
