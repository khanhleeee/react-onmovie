import classNames from 'classnames/bind';

import styles from './PageHeader.module.scss';

const cx = classNames.bind(styles);

function PageHeader(props) {
   return (
      <div className={cx('header')}>
         <h2>{props.children}</h2>
      </div>
   );
}

export default PageHeader;
