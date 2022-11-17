import { useState, useEffect } from "react";
import classname from "classnames/bind";

import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "./AddMovie.module.scss";
import Tag from "../../components/Tag/Tag";
import CastCard from "../../components/CastCard/CastCard";

const CASTS = [
  {
    ANC_ID: 1,
    ANC_NAME: "Tinne Oltmans",
    ANC_AVATAR:
      "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/61AFRRWijpO2DxubHrVoGucWZBf.jpg",
  },
  {
    ANC_ID: 2,
    ANC_NAME: "Tinne Oltmans 2",
    ANC_AVATAR:
      "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/61AFRRWijpO2DxubHrVoGucWZBf.jpg",
  },
  {
    ANC_ID: 3,
    ANC_NAME: "Tinne Oltman 3",
    ANC_AVATAR:
      "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/61AFRRWijpO2DxubHrVoGucWZBf.jpg",
  },
];

const cx = classname.bind(styles);

export const CastForm = () => {
  const [movieCasts, setMovieCasts] = useState([]);
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    // Lấy danh sách dien vien
    setCasts(CASTS);
  }, []);

  const handleAddCast = (item) => {
    if (item) {
      if (!movieCasts.some((genre) => genre.ANC_ID === item.ANC_ID)) {
        setMovieCasts([...movieCasts, item]);
      } else {
        alert(`Already add genre ${item.ANC_NAME} to movie`);
      }
    }
  };
  const handleRemoveCast = (item) => {
    setMovieCasts(movieCasts.filter((genre) => genre.ANC_ID !== item.ANC_ID));
  };

  return (
    <>
      <h2 className={cx("sub-title")}>Movie's Casts</h2>
      <Row>
        <Col lg={6}>
          <span>Casts of movie</span>
          <div className={cx("genres-container")}>
            <Row>
              {movieCasts.map((item, index) => (
                <CastCard
                  key={index}
                  item={item}
                  onClick={() => handleRemoveCast(item)}
                />
              ))}
            </Row>
          </div>
        </Col>

        <Col lg={6}>
          <span>List of casts</span>
          <ul className={cx("casts-list")}>
            <li className={cx("cast")}>
              <span className={cx("number")}>Number</span>
              <span className={cx("name")}>Name</span>
            </li>
            {casts.map((item, index) => (
              <li
                key={index}
                className={cx("genre")}
                onClick={() => handleAddCast(item)}
              >
                <span className={cx("number")}>{index + 1}</span>
                <span className={cx("name")}>{item.ANC_NAME}</span>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </>
  );
};
