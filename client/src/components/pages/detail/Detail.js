import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import onmoviedbApi from '~/api/onmoviedb';
import apiConfig from '~/api/apiConfig';
import styles from './Detail.module.scss';
import CastList from './CastList';
import serverNode from '~/api/serverNode';

const cx = classNames.bind(styles);

function Detail() {
   const { category, id } = useParams();

   const [item, setItem] = useState(null);

   useEffect(() => {
      const getDetail = async () => {
         // const response = await onmoviedbApi.detail(category, id);
         const response = await serverNode.getFilmDetail(id);
         setItem(response.data);
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
                     // backgroundImage: `url(${apiConfig.originalImage(
                     //    item.backdrop_path,
                     // )})`,
                     backgroundImage: `url(${item.F_BACKCDROP})`,
                  }}
               ></div>
               <div className={cx('content', 'mb-3')}>
                  <div className={cx('poster')}>
                     <div
                        className={cx('poster-img')}
                        style={{
                           // backgroundImage: `url(${apiConfig.originalImage(
                           //    item.poster_path,
                           // )})`,
                           backgroundImage: `url(${item.F_POSTER})`,
                        }}
                     ></div>
                  </div>
                  <div className={cx('info')}>
                     <div className={cx('title')}>
                        {item.title || item.name || item.F_OFFICIAL_NAME}
                     </div>
                     <div className={cx('genres')}>
                        {item.G_NAME &&
                           item.G_NAME.slice(0, 5).map((gene, i) => (
                              <span key={i} className={cx('item')}>
                                 {gene}
                                 {/* {gene.name} */}
                              </span>
                           ))}
                     </div>
                     <p className={cx('overview')}>{item.F_DESC}</p>
                     <div className={cx('cast')}>
                        <div className="section-header">
                           <h2>Casts</h2>
                        </div>
                        <CastList id={item.F_ID} />
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}

export default Detail;
