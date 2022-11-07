import classNames from 'classnames/bind';
import { useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import Button from '~/components/Button/Button';
import CardForm from '~/components/form/CardForm/CardForm';
import Input from '~/components/form/Input/Input';
import Separate from '~/components/form/Separate/Separate';
import serverNode from '~/api/serverNode';
import styles from './Authentic.module.scss';

const cx = classNames.bind(styles);

function SignUp() {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [data, setData] = useState('');
   const [sendStatus, setSendStatus] = useState('');

   const nameRef = useRef();
   const emailRef = useRef();
   const phoneRef = useRef();
   const passwordRef = useRef();
   const confirmPasswordRef = useRef();

   const handleRegister = async (e) => {
      e.preventDefault();

      const data = {
         U_NAME: nameRef.current.value,
         U_EMAI: emailRef.current.value,
         U_PHONE: phoneRef.current.value,
         U_PASSWORD: passwordRef.current.value,
      };

      console.log(data);

      serverNode
         .checkRegister({
            uid: '00019',
            name,
            email,
            password,
            confirmPassword,
         })
         .then((res) => {
            if (res.status === 200) {
               console.log(res.data);
               setData(res.data);
               localStorage.setItem('user', JSON.stringify(res.data));
               // window.location.href = '/';
            } else {
               setSendStatus(res.data);
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
            <CardForm title="Sign Up">
               <Input
                  ref={nameRef}
                  type="text"
                  placeholder="your name"
                  onChange={(e) => setName(e.target.value)}
                  errorMessage={sendStatus}
               />
               <Input
                  ref={emailRef}
                  type="email"
                  placeholder="email@mail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  errorMessage={sendStatus}
               />
               <Input
                  ref={phoneRef}
                  placeholder="your phone number"
                  onChange={(e) => setEmail(e.target.value)}
                  errorMessage={sendStatus}
               />
               <Input
                  ref={passwordRef}
                  type="password"
                  placeholder="password123"
                  onChange={(e) => setPassword(e.target.value)}
                  errorMessage={sendStatus}
               />
               <Input
                  ref={confirmPasswordRef}
                  type="password"
                  placeholder="confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  errorMessage={sendStatus}
               />
               <Button
                  className={cx('card-button')}
                  fullfill
                  onClick={handleRegister}
               >
                  Sign Up
               </Button>
               <Separate />
               <Button to="/login" className={cx('card-button')} fullfill gray>
                  Sign In
               </Button>
            </CardForm>
         </div>
      </div>
   );
}

export default SignUp;
