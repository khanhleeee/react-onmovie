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
