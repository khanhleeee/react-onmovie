import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
// import { useParams } from 'react-router-dom';
import onmoviedbApi from '~/api/onmoviedb';

import styles from './Detail.module.scss';

const cx = classNames.bind(styles);

function Trailers(props) {
   const category = 'movie';
   const [videos, setVideos] = useState([]);

   useEffect(() => {
      const getVideos = async () => {
         const response = await onmoviedbApi.getVideos(category, props.id);
         setVideos(response.results.slice(0, 3));
      };
      getVideos();
   }, [category, props.id]);

   return (
      <>
         {videos.map((item, i) => (
            <Video key={i} item={item} />
         ))}
      </>
   );
}

const Video = (props) => {
   const item = props.item;

   console.log('item', item);

   const iframeRef = useRef(null);

   useEffect(() => {
      const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
      iframeRef.current.setAttribute('height', height);
   }, []);

   return (
      <div className={cx('video')}>
         <div className={cx('title')}>
            <h2>{item.name}</h2>
         </div>
         <iframe
            src={`https://www.youtube.com/embed/${item.key}`}
            ref={iframeRef}
            width="100%"
            title="video"
         ></iframe>
      </div>
   );
};

export default Trailers;