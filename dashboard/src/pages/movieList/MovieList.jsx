import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import classname from "classnames/bind";

import styles from "./movieList.module.scss";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovies, deleteMovie } from "../../context/movieContext/apiCall";
import MovieCard from "../../components/MovieCard/MovieCard";
import SearchBar from "../../components/SearchBar/SearchBar";

const cx = classname.bind(styles);

export default function MovieList() {
  const { movies, dispatch } = useContext(MovieContext);

  //Films from database
  const films = [
    {
      id: 1,
      F_RELEASEYEAR: "12/23/2022",
      F_OFFICIAL_NAME: "Thợ Săn Quỷ",
      F_POSTER:
        "https://www.themoviedb.org/t/p/original/5DUMPBSnHOZsbBv81GFXZXvDpo6.jpg",
    },
    {
      id: 2,
      F_RELEASEYEAR: "10/1/2008",
      F_OFFICIAL_NAME: "Avatar",
      F_POSTER:
        "https://www.themoviedb.org/t/p/original/5DUMPBSnHOZsbBv81GFXZXvDpo6.jpg",
    },
    {
      id: 3,
      F_RELEASEYEAR: "8/2/2022",
      F_OFFICIAL_NAME: "Hope",
      F_POSTER:
        "https://www.themoviedb.org/t/p/original/5DUMPBSnHOZsbBv81GFXZXvDpo6.jpg",
    },
    {
      id: 4,
      F_RELEASEYEAR: "8/2/2022",
      F_OFFICIAL_NAME: "Hope",
      F_POSTER:
        "https://www.themoviedb.org/t/p/original/5DUMPBSnHOZsbBv81GFXZXvDpo6.jpg",
    },
  ];

  return (
    <div className={cx("container")}>
      <div className={cx("feature")}>
        <SearchBar />
        <Link to="/movie/add" className={cx("create-btn")}>
          Create new
        </Link>
      </div>

      <div className={cx("list")}>
        <div className={cx("grid")}>
          {films.map((item, index) => (
            <MovieCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
