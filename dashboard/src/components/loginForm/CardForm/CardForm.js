import classNames from 'classnames/bind';

import styles from '../Form.module.scss';
import Input from '../Input/Input';

const cx = classNames.bind(styles);

function CardForm({ title, children }) {
   return (
      <div className={cx('card')}>
         <span className={cx('header')}>{title}</span>

         <form className={cx('form')}>{children}</form>
      </div>
   );
}

export default CardForm;
