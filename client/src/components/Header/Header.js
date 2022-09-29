import { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import Button from '../Button/Button';

const cx = classNames.bind(styles);

const headerNav = [
   {
      display: 'Home',
      path: '/',
   },
   {
      display: 'Movies',
      path: '/movie',
   },
   {
      display: 'Login',
      path: '/login',
   },
];

function Header() {
   const { pathname } = useLocation();
   const headerRef = useRef(null);

   const active = headerNav.findIndex((e) => e.path === pathname);

   useEffect(() => {
      const shrinkHeader = () => {
         if (
            document.body.scrollTop > 100 ||
            document.documentElement.scrollTop > 100
         ) {
            headerRef.current.classList.add('active');
         } else {
            headerRef.current.classList.remove('active');
         }
      };
      window.addEventListener('scroll', shrinkHeader);
      return () => {
         window.removeEventListener('scroll', shrinkHeader);
      };
   }, []);

   return (
      <div ref={headerRef} className={cx('header')}>
         <div className={cx('wrapper', 'container')}>
            <div className="logo">
               <h3>on</h3>
               <h3>Movie</h3>
            </div>
            <ul className={cx('nav')}>
               {headerNav.map((item, index) => (
                  <li
                     key={index}
                     className={index === active ? cx('active') : ''}
                  >
                     <Link to={item.path}>{item.display}</Link>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
}

export default Header;
