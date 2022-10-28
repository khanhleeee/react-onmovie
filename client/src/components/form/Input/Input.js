import classNames from 'classnames/bind';

import styles from '../Form.module.scss';
import { EmailIcon, LockIcon, PenIcon } from '~/components/Icons/Icons';

const cx = classNames.bind(styles);

function Input({ type, placeholder, erroorMessage, onChange }) {
   let Icon = PenIcon;

   if (type == 'password') {
      Icon = LockIcon;
   } else if (type == 'email') {
      Icon = EmailIcon;
   }

   return (
      <div className={cx('form-group')}>
         <div className={cx('input')}>
            <Icon classNames={cx('icon')} />
            <input type="email" placeholder={placeholder} onChange={onChange} />
         </div>
         <span className={cx('message')}>{erroorMessage}</span>
      </div>
   );
}

export default Input;

export const EmailInPut = ({}) => {};

export const PassWordInPut = () => {
   <div className={cx('form-group')}>
      <div className={cx('input')}>
         <LockIcon classNames={cx('icon')} />
         <input type="password" placeholder="password123" />
      </div>
      <span className={cx('message')}>message</span>
   </div>;
};
