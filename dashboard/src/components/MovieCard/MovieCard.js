import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import { getMovies, deleteMovie } from "../../context/movieContext/apiCall";
import styles from "./MovieCard.module.scss";

const cx = classNames.bind(styles);

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function MovieCard(props) {
  const item = props.item;

  const date = new Date(
    item.F_RELEASEYEAR ? item.F_RELEASEYEAR : item.release_date
  );

  const formatDate = `${monthNames[date.getMonth()]}, ${date.getFullYear()}`;

  return (
    <div className={cx("container")}>
      <div className={cx("movie-card")}>
        <div
          className={cx("poster")}
          style={{ backgroundImage: `url(${item.F_POSTER})` }}
        ></div>
        <div className={cx("info")}>
          <h2 className={cx("info-title")}>{item.F_OFFICIAL_NAME}</h2>
          <ul className={cx("list")}>
            <li>
              <span className={cx("title")}>id: </span>
              <span className={cx("value")}>{item.id}</span>
            </li>

            <li>
              <span className={cx("title")}>release: </span>
              <span className={cx("value")}>{formatDate}</span>
            </li>
            <li>
              <span className={cx("title")}>rating: </span>
              <span className={cx("value")}>5.6</span>
            </li>
          </ul>
        </div>
        <div className={cx("feature-btn")}>
          <button>Edit</button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
