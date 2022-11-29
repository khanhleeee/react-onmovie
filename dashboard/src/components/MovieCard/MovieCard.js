import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { MOVIE } from "../../constants";

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

export default function MovieCard(props) {
  const item = props.item;

  const date = new Date(item[MOVIE.release_date]);

  const formatDate = `${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
  const link = `movie/edit/${item[MOVIE.id]}`;

  return (
    <div className={cx("container")}>
      <div className={cx("movie-card")}>
        <div
          className={cx("poster")}
          style={{ backgroundImage: `url(${item[MOVIE.backdrop]})` }}
        ></div>
        <div className={cx("info")}>
          <h2 className={cx("info-title")}>{item[MOVIE.name]}</h2>
          <ul className={cx("list")}>
            <li>
              <span className={cx("title")}>ID: </span>
              <span className={cx("value")}>{item[MOVIE.id]}</span>
            </li>

            <li>
              <span className={cx("title")}>Release: </span>
              <span className={cx("value")}>{formatDate}</span>
            </li>
            <li>
              <span className={cx("title")}>Rating: </span>
              <span className={cx("value")}>5.6</span>
            </li>
          </ul>
        </div>
        <div className={cx("feature-btn")}>
          <Link to={link} state={item}>Edit</Link>
        </div>
      </div>
    </div>
  );
}