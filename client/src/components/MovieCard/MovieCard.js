import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import apiConfig from '~/api/apiConfig';
import { category } from '~/api/onmoviedb';
import styles from './MovieCard.module.scss';

const cx = classNames.bind(styles);

const monthNames = [
   'Jan',
   'Feb',
   'Mar',
   'Apr',
   'May',
   'Jun',
   'Jul',
   'Aug',
   'Sep',
   'Oct',
   'Nov',
   'Dec',
];

function MovieCard(props) {
   const item = props.item;

   const link = '/' + category[props.category] + '/' + item.id;

   const backgroud = apiConfig.w500Image(
      item.poster_path || item.backdrop_path,
   );

   const date = new Date(item.release_date);

   const formatDate = `${monthNames[date.getMonth()]}, ${date.getFullYear()}`;

   return (
      <Link to={link}>
         <div className={cx('movie-card')}>
            <div
               className={cx('poster')}
               style={{ backgroundImage: `url(${backgroud})` }}
            ></div>
            <div className={cx('info')}>
               <h3 className={cx('title')}>{item.title || item.name}</h3>
               <span className={cx('release-date')}>{formatDate}</span>
            </div>
         </div>
      </Link>
   );
}

export default MovieCard;