import { createRef, forwardRef, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';

import Input from '~/components/form/Input/Input';
import { UserIcon } from '~/components/Icons/Icons';
import Modal, { ModalContent } from '~/components/Modal/Modal';

import styles from './User.module.scss';

const cx = classNames.bind(styles);

// Giả lập 1 người dùng lấy từ database
const user = {
   U_ID: 1,
   U_NAME: 'Khánh Lê',
   U_PHONE: '0123456789',
   U_EMAIL: 'khanhle@gmail.com',
};

function User() {
   const [activePage, setActivePage] = useState('Account');
   const [activeModalLogout, setActiveModalLogout] = useState(false);

   return (
      <div className={cx('container')}>
         <div className={cx('side-bar')}>
            <div className={cx('general-info')}>
               <UserIcon classNames={cx('icon')} />
               <div className={cx('info')}>
                  <span className={cx('name')}>{user.U_NAME}</span>
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
               <Button fullfill>Logout</Button>
            </ModalContent>
         </Modal>
         <div className={cx('content')}>
            {activePage === 'Account' && (
               <>
                  <h2 className={cx('title')}>My Account</h2>
                  <Account />
               </>
            )}
         </div>
      </div>
   );
}

const Account = () => {
   const [activeModal, setActiveModal] = useState(false);

   const nameRef = useRef();
   const emailRef = useRef();
   const phoneRef = useRef();

   const handleSubmit = () => {
      const data = {
         U_NAME: nameRef.current.value,
         U_EMAIL: emailRef.current.value,
         U_PHONE: phoneRef.current.value,
      };

      // Dữ liệu nhập vào ở đây
      console.log(data);
   };

   return (
      <>
         <div className={cx('profile')}>
            <div className={cx('info')}>
               <UserIcon classNames={cx('icon')} />
               <div>
                  <span className={cx('name')}>{user.U_NAME}</span>
                  <ul className={cx('info-details')}>
                     <li>
                        <span className={cx('title')}>Email: </span>
                        <span>{user.U_EMAIL}</span>
                     </li>
                     <li>
                        <span className={cx('title')}>Phone: </span>
                        <span>{user.U_PHONE}</span>
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
                     <Input ref={nameRef} value={user.U_NAME} />
                     <Input ref={emailRef} value={user.U_EMAIL} type="email" />
                     <Input ref={phoneRef} value={user.U_PHONE} />
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

export default User;
