import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';
import { EmailIcon, LockIcon } from '~/components/Icons/Icons';

import PageHeader from '~/components/PageHeader/PageHeader';
import styles from './Authentic.module.scss';

const cx = classNames.bind(styles);

function SignIn() {
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

               <form className={cx('form')}>
                  <div className={cx('form-group')}>
                     <div className={cx('input')}>
                        <EmailIcon classNames={cx('icon')} />
                        <input type="email" placeholder="email@mail.com" />
                     </div>
                     <span className={cx('message')}>message</span>
                  </div>
                  <div className={cx('form-group')}>
                     <div className={cx('input')}>
                        <LockIcon classNames={cx('icon')} />
                        <input type="password" placeholder="password123" />
                     </div>
                     <span className={cx('message')}>message</span>
                  </div>
                  <Button className={cx('card-button')} fullfill>
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
