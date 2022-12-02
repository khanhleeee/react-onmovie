import { useState, useEffect } from "react";
import classname from "classnames/bind";

import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "./AddMovie.module.scss";
import Tag from "../../components/Tag/Tag";
import { serverNode } from "../../api/serverNode";

const cx = classname.bind(styles);

export const GenresForm = ({ movieGenres, setMovieGenres }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getAllGenre = async () => {
      const response = await serverNode.getAllGenres();
      setGenres(response.data.data);
    };
    getAllGenre();
  }, []);

  const handleAddGenre = (item) => {
    if (item) {
      if (!movieGenres.some((genre) => genre.G_ID === item.G_ID)) {
        //call api here
        setMovieGenres([...movieGenres, item]);
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

      <Row>
        <Col xs={{ order: 1 }}>
          <AddNew />
        </Col>
      </Row>
    </>
  );
};

const AddNew = () => {
  return <div>Hello</div>;
};
