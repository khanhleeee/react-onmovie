import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '~/components/Button/Button';
import CardForm from '~/components/form/CardForm/CardForm';
import Input from '~/components/form/Input/Input';
import Separate from '~/components/form/Separate/Separate';

import styles from './Authentic.module.scss';

const cx = classNames.bind(styles);

function SignUp() {
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
               <Input type="text" placeholder="your nickname" />
               <Input type="email" placeholder="email@mail.com" />
               <Input type="password" placeholder="password123" />
               <Input type="password" placeholder="confirm password" />
               <Button className={cx('card-button')} fullfill>
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
