import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';

import Input from '~/components/form/Input/Input';
import { DeleteIcon, UserIcon } from '~/components/Icons/Icons';
import Modal, { ModalContent } from '~/components/Modal/Modal';

import styles from './User.module.scss';
import serverNode from '~/api/serverNode';
import MovieCard from '~/components/MovieCard/MovieCard';

const cx = classNames.bind(styles);

export default function User() {
   const [activePage, setActivePage] = useState('Account');
   const [activeModalLogout, setActiveModalLogout] = useState(false);

   const location = useLocation();
   const dataUser = location.state.user;

   const handleLogout = () => {
      localStorage.removeItem('user');
      window.location.href = '/login';
   };

   return (
      <div className={cx('container')}>
         <div className={cx('side-bar')}>
            <div className={cx('general-info')}>
               <UserIcon classNames={cx('icon')} />
               <div className={cx('info')}>
                  <span className={cx('name')}>{dataUser.fullName}</span>
                  <span className={cx('level')}>Member</span>
               </div>
            </div>
            <ul className={cx('menu')}>
               <li
                  className={activePage === 'Account' ? cx('active') : ''}
                  onClick={() => setActivePage('Account')}
               >
                  My Account
               </li>
               <li
                  className={activePage === 'Watchlist' ? cx('active') : ''}
                  onClick={() => setActivePage('Watchlist')}
               >
                  Watch list
               </li>
               <li
                  className={cx('border-top')}
                  onClick={() => setActiveModalLogout(true)}
               >
                  Logout
               </li>
            </ul>
         </div>
         <Modal active={activeModalLogout}>
            <ModalContent
               className={cx('modal')}
               onClose={() => setActiveModalLogout(false)}
            >
               <h4 className={cx('title')}>Do you want to log out?</h4>
               <Button fullfill onClick={handleLogout}>
                  Logout
               </Button>
            </ModalContent>
         </Modal>
         <div className={cx('content')}>
            {(activePage === 'Account' && (
               <>
                  <h2 className={cx('title')}>My Account</h2>
                  <Account />
               </>
            )) ||
               (activePage === 'Watchlist' && (
                  <>
                     <h2 className={cx('title')}>My Watchlist</h2>
                     <Watchlist />
                  </>
               ))}
         </div>
      </div>
   );
}

const Account = () => {
   const [activeModal, setActiveModal] = useState(false);

   const location = useLocation();
   const dataUser = location.state.user;

   const nameRef = useRef();
   const phoneRef = useRef();

   const handleSubmit = () => {
      const dataUpdate = {
         fullName: nameRef.current.value,
         phoneNumber: phoneRef.current.value,
      };

      serverNode
         .upgradeUser(dataUser.id, {
            fullName: dataUpdate.fullName,
            phoneNumber: dataUpdate.phoneNumber,
         })
         .then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data.data));
            window.location.href = '/user';
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <>
         <div className={cx('profile')}>
            <div className={cx('info')}>
               <UserIcon classNames={cx('icon')} />
               <div>
                  <span className={cx('name')}>{dataUser.fullName}</span>
                  <ul className={cx('info-details')}>
                     <li>
                        <span className={cx('title')}>Email: </span>
                        <span>{dataUser.email}</span>
                     </li>
                     <li>
                        <span className={cx('title')}>Phone: </span>
                        <span>{dataUser.phoneNumber}</span>
                     </li>
                  </ul>
               </div>
            </div>
            <button
               className={cx('feature-btn')}
               onClick={() => setActiveModal(true)}
            >
               Edit
            </button>
            {activeModal && (
               <Modal active={activeModal}>
                  <ModalContent onClose={() => setActiveModal(false)}>
                     <Input ref={nameRef} value={dataUser.fullName} />
                     <Input ref={phoneRef} value={dataUser.phoneNumber} />
                     <Button fullfill onClick={handleSubmit}>
                        Update
                     </Button>
                  </ModalContent>
               </Modal>
            )}
         </div>
      </>
   );
};

const Watchlist = (props) => {
   const [films, setFilms] = useState([]);
   const [editActive, setEditActive] = useState(false);

   useEffect(() => {
      const getList = async () => {
         const userData = JSON.parse(localStorage.getItem('user'));
         await serverNode.getWatchList(userData.id)
            .then((res) => {
               setFilms(res.data.data);
            })
            .catch((err) => {
               console.log(err);
            });
      };
      getList();
   }, []);

   const handleRemoveFilm = (id) => {
      // for (let i in films) {
      //    if (films[i].F_ID === id) {
      //       films.splice(films.indexOf(id), 1);
      //    }
      // }
      const userData = JSON.parse(localStorage.getItem('user'));
      serverNode.removeWatchList({ U_ID: userData.id, F_ID: id })
         .then((res) => {
            films.splice(films.indexOf(id), 1);
            setFilms(films);
            setEditActive(false);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <div className={cx('watchlist-wrapper')}>
         <div className={cx('feature')}>
            <button
               className={cx('edit-btn')}
               onClick={() => setEditActive(!editActive)}
            >
               Edit
            </button>
         </div>
         <div className={cx('watchlist')}>
            {
               films.length == 0 ? (
                  <div className={cx('empty')}>No film in watchlist</div>
               ) : (
                  films.map((item, index) => (
                     <div key={index} className={cx('watchlist-item')}>
                        <MovieCard item={item} />
                        {editActive && (
                           <span
                              className={cx('edit-badge')}
                              onClick={() => handleRemoveFilm(item.F_ID)}
                           >
                              <DeleteIcon className={cx('icon')} />
                           </span>
                        )}
                     </div>
                  ))
               )
            }
         </div>
      </div>
   );
};
