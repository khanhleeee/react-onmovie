import { useState } from 'react';
import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';
import { EmailIcon, LockIcon } from '~/components/Icons/Icons';
import styles from './Authentic.module.scss';
import serverNode from '~/api/serverNode';

const cx = classNames.bind(styles);

function SignIn() {
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
            <div className={cx('card')}>
               <span className={cx('header')}>Sign In</span>
               {sendStatus ? <p className="loginStatus">{sendStatus}</p> : null}
               <form className={cx('form')}>
                  <div className={cx('form-group')}>
                     <div className={cx('input')}>
                        <EmailIcon classNames={cx('icon')} />
                        <input
                           type="email"
                           placeholder="email@mail.com"
                           onChange={(e) => setEmail(e.target.value)}
                        />
                     </div>
                     <span className={cx('message')}>message</span>
                  </div>
                  <div className={cx('form-group')}>
                     <div className={cx('input')}>
                        <LockIcon classNames={cx('icon')} />
                        <input
                           type="password"
                           placeholder="password123"
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </div>
                     <span className={cx('message')}>message</span>
                  </div>
                  <Button
                     className={cx('card-button')}
                     fullfill
                     onClick={handleLogin}
                  >
                     Sign In
                  </Button>
                  <div className={cx('separate')}>
                     <span className={cx('line')}></span>
                     <span className={cx('text')}>or</span>
                     <span className={cx('line')}></span>
                  </div>
                  <Button className={cx('card-button')} fullfill gray>
                     Sign Up
                  </Button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default SignIn;
