import { forwardRef } from 'react';
import classNames from 'classnames/bind';

import styles from '../Form.module.scss';
import { EmailIcon, LockIcon, PenIcon } from '~/components/Icons/Icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Input({ innerRef, type, placeholder, value, errorMessage }, ref) {
   const [inputValue, setInputValue] = useState(value || '');

   //Hông biết dùng ref như thế nào
   // Dùng như này nè :)))

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
            <input
               ref={ref}
               type={type}
               placeholder={placeholder}
               onChange={(e) => setInputValue(e.target.value)}
               value={inputValue}
            />
         </div>
         <span className={cx('message')}>{errorMessage}</span>
      </div>
   );
}

export default forwardRef(Input);
