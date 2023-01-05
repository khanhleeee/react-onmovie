import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classname from "classnames/bind";

import styles from "./movieList.module.scss";
import MovieCard from "../../components/MovieCard/MovieCard";
import SearchBar from "../../components/SearchBar/SearchBar";
// import { MOVIE } from "../../constants";
import { serverNode } from "../../api/serverNode";

const cx = classname.bind(styles);

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await serverNode.getMoviesList(1, 25);
      setMovies(response.data.data);
    };
    getMovies();
  }, []);

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
          {movies.map((item, index) => (
            <MovieCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
