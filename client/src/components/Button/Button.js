import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
   children,
   className,
   gray = false,
   fullfill = false,
   outline = false,
   onClick,
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

   return (
      <button
         className={classes}
         onClick={onClick ? onClick : null}
         {...otherProps}
      >
         {children}
      </button>
   );
}

export default Button;
