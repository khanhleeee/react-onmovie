import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '~/components/Button/Button';
import CardForm from '~/components/form/CardForm/CardForm';
import Input from '~/components/form/Input/Input';
import Separate from '~/components/form/Separate/Separate';

import styles from './Authentic.module.scss';

const cx = classNames.bind(styles);

function LogIn() {
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
               <Input type="email" placeholder="email@mail.com" />
               <Input type="password" placeholder="password123" />
               <Button className={cx('card-button')} fullfill>
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
