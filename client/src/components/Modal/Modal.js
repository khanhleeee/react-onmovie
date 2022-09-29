import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

// import 'boxicons';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ className, children, ...props }) {
   const [active, setActive] = useState(false);

   const classes = cx('modal', { active }, className);

   useEffect(() => {
      setActive(props.active);
   }, [props.active]);

   return (
      <div id={props.id} className={classes}>
         {children}
      </div>
   );
}

export const ModalContent = (props) => {
   const contentRef = useRef(null);

   const closeModal = () => {
      contentRef.current.parentNode.classList.remove('active');
      if (props.onClose) {
         props.onClose();
      }
   };

   return (
      <div ref={contentRef} className={cx('content')}>
         {props.children}
         <div className={cx('close-btn')} onClick={closeModal}>
            <box-icon name="x-circle"></box-icon>
         </div>
      </div>
   );
};

export default Modal;
