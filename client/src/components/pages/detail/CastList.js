import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import onmoviedbApi from '~/api/onmoviedb';
import styles from './Detail.module.scss';
import apiConfig from '~/api/apiConfig';

const cx = classNames.bind(styles);

function CastList(props) {
   const category = 'movie';

   const [casts, setCasts] = useState([]);

   useEffect(() => {
      const getCredits = async () => {
         const response = await onmoviedbApi.credits(category, props.id);
         setCasts(response.cast.slice(0, 5));
      };
      getCredits();
   }, [category, props.id]);

   return (
      <div className={cx('casts')}>
         {casts.map((cast, i) => (
            <div key={i} className={cx('cast')}>
               <div
                  className={cx('cast-img')}
                  style={{
                     backgroundImage: `url(${apiConfig.w500Image(
                        cast.profile_path,
                     )})`,
                  }}
               ></div>
               <p className={cx('cast-name')}>{cast.name}</p>
            </div>
         ))}
      </div>
   );
}
export default CastList;
