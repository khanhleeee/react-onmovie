import { useState, useEffect } from "react";
import classname from "classnames/bind";

import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "./editMovie.module.scss";
import Tag from "../../components/Tag/Tag";
import { serverNode } from "../../api/serverNode";
import AddNew from "../../components/AddNew/AddNew";

const cx = classname.bind(styles);

export const GenresForm = ({ id }) => {
  const [movieGenres, setMovieGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getAllGenre = async () => {
      const response = await serverNode.getAllGenres();
      setGenres(response.data.data);
    };
    getAllGenre();
    const getGenreOfMovie = async () => {
      const response = await serverNode.getGenreMovie(id);
      setMovieGenres(response.data.data);
    };
    getGenreOfMovie();
  }, []);

  const handleAddGenre = (item) => {
    if (item) {
      if (!movieGenres.some((genre) => genre.G_ID === item.G_ID)) {
        setMovieGenres([...movieGenres, item]);
        serverNode.addGenreMovie(id, item.G_ID);
      } else {
        alert(`Already add genre ${item.G_NAME} to movie`);
      }
    }
  };

  const handleRemoveGenre = (item) => {
    const newMovieGenres = movieGenres.filter(
      (genre) => genre.G_ID !== item.G_ID
    );
    setMovieGenres(newMovieGenres);
    serverNode.removieGenreMovie(id, item.G_ID);
  };

  return (
    <>
      <h2 className={cx("sub-title")}>Movie's Genres</h2>
      <Row>
        <Col lg={6}>
          <span>Genres of movie</span>
          <div className={cx("genres-container")}>
            <Row>
              {movieGenres.map((item, index) => (
                <Tag
                  key={index}
                  item={{ name: item.G_NAME }}
                  onClick={() => handleRemoveGenre(item)}
                />
              ))}
            </Row>
          </div>
        </Col>
        <Col lg={6}>
          <span>List of genres</span>
          <ul className={cx("genres-list")}>
            <li className={cx("genre")}>
              <span className={cx("number")}>Number</span>
              <span className={cx("name")}>Name</span>
            </li>
            {genres.map((item, index) => (
              <li
                key={index}
                className={cx("genre")}
                onClick={() => handleAddGenre(item)}
              >
                <span className={cx("number")}>{index + 1}</span>
                <span className={cx("name")}>{item.G_NAME}</span>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      <div className={cx("addnew-btn")}>
        <AddNew genre />
      </div>
    </>
  );
};
