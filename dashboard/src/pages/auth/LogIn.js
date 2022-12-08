import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import Button from '../../components/Button/Button';
import CardForm from '../../components/loginForm/CardForm/CardForm';
import { serverNode } from "../../api/serverNode";

import styles from './Authentic.module.scss';
const cx = classNames.bind(styles);

export default function LogIn() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [sendStatus, setSendStatus] = useState('');

   const handleLogin = async (e) => {
      e.preventDefault();
      serverNode.login({ email, password })
         .then((res) => {
            if (res.status === 401) {
               setSendStatus(res.data);
            } else if (res.status === 500) {
               setSendStatus(res.data);
            } else if (res.status === 200) {
               localStorage.setItem('user', JSON.stringify(res.data.data));
               window.location.href = '/';
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
               <div className={cx('send-status')}>{sendStatus}</div>
               <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
               <Button
                  className={cx('card-button')}
                  fullfill
                  onClick={handleLogin}
               >
                  Sign In
               </Button>
            </CardForm>
         </div>
      </div>
   );
}
