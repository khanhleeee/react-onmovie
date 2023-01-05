import classNames from 'classnames/bind';

import styles from '../Form.module.scss';

const cx = classNames.bind(styles);

function Separate() {
   return (
      <div className={cx('separate')}>
         <span className={cx('line')}></span>
         <span className={cx('text')}>or</span>
         <span className={cx('line')}></span>
      </div>
   );
}

export default Separate;
