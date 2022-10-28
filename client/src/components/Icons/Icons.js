export const SearchIcon = ({
   width = '2.4rem',
   height = '2.4rem',
   classNames,
}) => {
   return (
      <svg
         className={classNames}
         width={width}
         height={height}
         fill="currentColor"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
      </svg>
   );
};

export const EmailIcon = ({
   width = '2.4rem',
   height = '2.4rem',
   classNames,
}) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={width}
         height={height}
         className={classNames}
         viewBox="0 0 24 24"
         fill="currentColor"
      >
         <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path>
      </svg>
   );
};

export const LockIcon = ({
   width = '2.4rem',
   height = '2.4rem',
   classNames,
}) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         className={classNames}
         width={width}
         height={height}
         fill="currentColor"
         viewBox="0 0 24 24"
      >
         <path d="M17 8V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3v1h2zm1 4 .002 8H6v-8h12z"></path>
      </svg>
   );
};

export const PenIcon = ({
   width = '2.4rem',
   height = '2.4rem',
   classNames,
}) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={width}
         height={height}
         className={classNames}
         fill="currentColor"
         viewBox="0 0 24 24"
      >
         <path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"></path>
      </svg>
   );
};
