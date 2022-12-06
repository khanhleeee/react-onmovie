import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';
import CardForm from '~/components/form/CardForm/CardForm';
import Input from '~/components/form/Input/Input';
import Separate from '~/components/form/Separate/Separate';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Authentic.module.scss';
import serverNode from '~/api/serverNode';

const cx = classNames.bind(styles);

export default function LogIn() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [sendStatus, setSendStatus] = useState('');

   const showToast = (message, type) => {
      switch (type) {
         case 'success':
            return toast.success(`${message}`, {
               position: 'top-right',
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: 'light',
            });
         case 'error':
            return toast.error(`${message}`, {
               position: 'top-right',
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: 'light',
            });
         default:
            return toast(`${message}`, {
               position: 'top-right',
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: 'light',
            });
      }
   };

   const emailRef = useRef();
   const passwordRef = useRef();

   const handleLogin = async (e) => {
      e.preventDefault();
      serverNode
         .checkLogin({
            email: emailRef.current.value,
            password: passwordRef.current.value,
         })
         .then((res) => {
            if (res.status === 500) {
               // setSendStatus(res.data);
               showToast(res.data, 'error');
            } else if (res.status === 200) {
               localStorage.setItem('user', JSON.stringify(res.data.data));
               window.location.href = '/';
            } else {
               showToast(res.data);
            }
         });
   };

   return (
      <div className={cx('container')}>
         <div className={cx('card-container')}>
            <div className={cx('logo-container')}>
               <div className="logo">
                  <span>on</span>
                  <span>Movie</span>
               </div>
            </div>
            <CardForm title="Sign In">
               <Input
                  type="email"
                  placeholder="email@mail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  errorMessage={sendStatus}
                  ref={emailRef}
               />
               <Input
                  type="password"
                  placeholder="password123"
                  onChange={(e) => setPassword(e.target.value)}
                  errorMessage={sendStatus}
                  ref={passwordRef}
               />
               <Button
                  className={cx('card-button')}
                  fullfill
                  onClick={handleLogin}
               >
                  Sign In
               </Button>
               <Separate />
               <Button to="/signup" className={cx('card-button')} fullfill gray>
                  Sign Up
               </Button>
            </CardForm>
         </div>
         <ToastContainer
            style={{ width: '400px' }}
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
      </div>
   );
}
