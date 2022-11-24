import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import apiConfig from '~/api/apiConfig';
import { MOVIE } from '~/constants';
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

   const classes = cx('movie-card', props.className);

   // const link = '/' + category[props.category] + '/' + item.id;
   const link = '/' + 'movie' + '/' + item[MOVIE.id];

   const backgroud = apiConfig.w500Image(
      item[MOVIE.poster] || item[MOVIE.backdrop],
   );

   const date = new Date(item[MOVIE.release_date]);
   const formatDate = `${monthNames[date.getMonth()]}, ${date.getFullYear()}`;

   return (
      <Link to={link}>
         <div className={classes}>
            <div
               className={cx('poster')}
               style={{ backgroundImage: `url(${backgroud})` }}
            ></div>
            <div className={cx('info')}>
               <h3 className={cx('title')}>{item[MOVIE.name]}</h3>
               <span className={cx('release-date')}>{formatDate}</span>
            </div>
         </div>
      </Link>
   );
}

export default MovieCard;
