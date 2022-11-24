import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import onmoviedbApi from '~/api/onmoviedb';
import styles from './Detail.module.scss';
import apiConfig from '~/api/apiConfig';
import serverNode from '~/api/serverNode';
import { ACTORS } from '~/constants';

const cx = classNames.bind(styles);

function CastList(props) {
   const category = 'movie';
   const [casts, setCasts] = useState([]);

   useEffect(() => {
      const getCredits = async () => {
         // const response = await onmoviedbApi.credits(category, props.id);
         // setCasts(response.cast.slice(0, 5));
         const response = await serverNode.getActorFilm(props.id);
         setCasts(response.data.slice(0, 5));
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
                        cast[ACTORS.avatar],
                     )})`,
                  }}
               ></div>
               <p className={cx('cast-name')}>{cast[ACTORS.name]}</p>
            </div>
         ))}
      </div>
   );
}
export default CastList;
