import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
   children,
   className,
   gray = false,
   fullfill = false,
   outline = false,
   onClick,
   to,
   ...otherProps
}) {
   const classes = cx(
      'btn',
      {
         outline,
         fullfill,
         gray,
      },
      className,
   );

   let Component = 'button';

   if (to) {
      Component = Link;
   }

   return (
      <Component
         className={classes}
         to={to ? to : null}
         onClick={onClick ? onClick : null}
         {...otherProps}
      >
         {children}
      </Component>
   );
}

export default Button;
