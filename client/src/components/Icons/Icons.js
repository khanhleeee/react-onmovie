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

export const DashBoardIcon = ({ classNames }) => {
   return (
      <svg
         className={classNames}
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="currentColor"
      >
         <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"></path>
      </svg>
   );
};

export const LogoutIcon = ({ classNames }) => {
   return (
      <svg
         className={classNames}
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="currentColor"
      >
         <path d="m2 12 5 4v-3h9v-2H7V8z"></path>
         <path d="M13.001 2.999a8.938 8.938 0 0 0-6.364 2.637L8.051 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051 2.051 3.08 2.051 4.95-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637c1.7-1.699 2.637-3.959 2.637-6.364s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z"></path>
      </svg>
   );
};
