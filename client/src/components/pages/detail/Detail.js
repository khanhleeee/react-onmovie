import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Detail.module.scss';
import CastList from './CastList';
import serverNode from '~/api/serverNode';
import Trailers from './Trailers';
import MovieList from '~/components/MovieList/MovieList';
import Rating from './Rating';
import Favorite from './Favorite';
import { MOVIE } from '~/constants';
import { StarIcon } from '~/components/Icons/Icons';

const cx = classNames.bind(styles);

function Detail() {
   const { id } = useParams();
   const category = 'movie';

   const [item, setItem] = useState(null);
   const [genres, setGenres] = useState([]);

   useEffect(() => {
      const getDetail = async () => {
         window.scrollTo(0, 0);
         const response = await serverNode.getFilmDetail(id);
         setItem(response.data.data);
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
                     backgroundImage: `url(${item[MOVIE.backdrop]})`,
                  }}
               ></div>
               <div className={cx('content', 'mb-3')}>
                  <div className={cx('poster')}>
                     <div
                        className={cx('poster-img')}
                        style={{
                           backgroundImage: `url(${item[MOVIE.poster]})`,
                        }}
                     ></div>
                  </div>
                  <div className={cx('info')}>
                     <div className={cx('header')}>
                        <div>
                           <div className={cx('title-rating')}>
                              <div className={cx('title')}>
                                 {item[MOVIE.name]}
                              </div>
                              <div className={cx('rating')}>
                                 <StarIcon classNames={cx('icon')} />
                                 <span>
                                    {Math.round(item[MOVIE.avg] * 100) / 100}
                                 </span>
                              </div>
                           </div>
                           <div className={cx('genres')}>
                              {item.G_NAME &&
                                 item.G_NAME.slice(0, 5).map((gene, i) => (
                                    <span key={i} className={cx('item')}>
                                       {gene}
                                    </span>
                                 ))}
                           </div>
                           <div className={cx('genres')}></div>
                        </div>
                        <div className={cx('feature-btns')}>
                           <Rating id={id} />
                           <Favorite id={id} />
                        </div>
                     </div>
                     <p className={cx('overview')}>{item[MOVIE.desc]}</p>
                     <div className={cx('cast')}>
                        <div className="section-header">
                           <h2>Casts</h2>
                        </div>
                        <CastList id={item[MOVIE.id]} />
                     </div>
                  </div>
               </div>
               <div className={cx('trailer', 'container')}>
                  <div className="section mb-3">
                     <Trailers id={item[MOVIE.id]} />
                  </div>
                  <div className="section mb-3">
                     <div className="section-header mb-2">
                        <h2>Similar</h2>
                     </div>
                     <MovieList
                        category={category}
                        type="similar"
                        id={item[MOVIE.id]}
                     />
                  </div>
               </div>
            </div>
         )}
      </>
   );
}

export default Detail;
