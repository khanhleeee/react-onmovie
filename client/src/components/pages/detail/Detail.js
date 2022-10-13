import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import onmoviedbApi from '~/api/onmoviedb';
import apiConfig from '~/api/apiConfig';
import styles from './Detail.module.scss';
import CastList from './CastList';

const cx = classNames.bind(styles);

function Detail() {
   const { category, id } = useParams();

   const [item, setItem] = useState(null);

   useEffect(() => {
      const getDetail = async () => {
         const response = await onmoviedbApi.detail(category, id);
         setItem(response);
      };

      getDetail();
   }, [category, id]);

   return (
      <>
         {item && (
            <div className={cx('movie-detail')}>
               <div
                  className={cx('banner')}
                  style={{
                     backgroundImage: `url(${apiConfig.originalImage(
                        item.backdrop_path,
                     )})`,
                  }}
               ></div>
               <div className={cx('content', 'mb-3')}>
                  <div className={cx('poster')}>
                     <div
                        className={cx('poster-img')}
                        style={{
                           backgroundImage: `url(${apiConfig.originalImage(
                              item.poster_path,
                           )})`,
                        }}
                     ></div>
                  </div>
                  <div className={cx('info')}>
                     <div className={cx('title')}>
                        {item.title || item.name}
                     </div>
                     <div className={cx('genres')}>
                        {item.genres &&
                           item.genres.slice(0, 5).map((gene, i) => (
                              <span key={i} className={cx('item')}>
                                 {gene.name}
                              </span>
                           ))}
                     </div>
                     <p className={cx('overview')}>{item.overview}</p>
                     <div className={cx('cast')}>
                        <div className="section-header">
                           <h2>Casts</h2>
                        </div>
                        <CastList id={item.id} />
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}

export default Detail;