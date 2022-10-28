import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '~/components/Button/Button';
import CardForm from '~/components/form/CardForm/CardForm';
import Input from '~/components/form/Input/Input';
import Separate from '~/components/form/Separate/Separate';

import styles from './Authentic.module.scss';
import serverNode from '~/api/serverNode';

const cx = classNames.bind(styles);

function LogIn() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [data, setData] = useState('');
   const [sendStatus, setSendStatus] = useState('');

   const handleLogin = async (e) => {
      e.preventDefault();
      serverNode
         .checkLogin({ email, password })
         .then((res) => {
            if (res.status === 401) {
               setSendStatus(res.data);
            } else if (res.status === 200) {
               localStorage.setItem('user', JSON.stringify(res.data));
               window.location.href = '/';
            }
         })
         .catch((err) => {
            console.log(err);
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
               {sendStatus ? <p className="loginStatus">{sendStatus}</p> : null}
               <Input
                  type="email"
                  placeholder="email@mail.com"
                  onChange={(e) => setEmail(e.target.value)}
               />
               <Input
                  type="password"
                  placeholder="password123"
                  onChange={(e) => setPassword(e.target.value)}
               />
               {/* <input
                  type="email"
                  placeholder="email@mail.com"
                  onChange={(e) => setEmail(e.target.value)}
               />
               <input
                  type="password"
                  placeholder="password123"
                  onChange={(e) => setPassword(e.target.value)}
               /> */}
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
      </div>
   );
}

export default LogIn;
