import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

// import 'boxicons';

import styles from './Modal.module.scss';
import { DeleteIcon } from '../Icons/Icons';

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

   const classes = cx('content', props.className);

   const closeModal = () => {
      contentRef.current.parentNode.classList.remove(cx('active'));
      if (props.onClose) {
         props.onClose();
      }
   };

   return (
      <div ref={contentRef} className={classes}>
         {props.children}
         <div className={cx('close-btn')} onClick={closeModal}>
            <DeleteIcon />
         </div>
      </div>
   );
};

export default Modal;
