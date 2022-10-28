import { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import SearchBar from '../SearchBar/SearchBar';

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
];

function Header() {
   const { pathname } = useLocation();
   const headerRef = useRef(null);

   const active = headerNav.findIndex((e) => e.path === pathname);

   useEffect(() => {
      const shrinkHeader = () => {
         if (document.documentElement.scrollTop > 100) {
            headerRef.current.classList.add(cx('active'));
         } else {
            headerRef.current.classList.remove(cx('active'));
         }
      };
      window.addEventListener('scroll', shrinkHeader);
   }, []);

   return (
      <div ref={headerRef} className={cx('header')}>
         <div className={cx('wrapper', 'container')}>
            <div className={cx('menu')}>
               {/* Logo */}
               <Link to="/" className="logo">
                  <span>on</span>
                  <span>Movie</span>
               </Link>

               {/* Nav */}
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
            <div className="section">
               <SearchBar />
            </div>
         </div>
      </div>
   );
}

export default Header;
