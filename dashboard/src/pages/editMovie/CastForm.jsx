import { useState, useEffect } from "react";
import classname from "classnames/bind";

import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "./editMovie.module.scss";
import AddNew from "../../components/AddNew/AddNew";
import CastCard from "../../components/CastCard/CastCard";
import { serverNode } from "../../api/serverNode";

const cx = classname.bind(styles);

export const CastForm = ({ id }) => {
  const [movieCasts, setMovieCasts] = useState([]);
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getAllCast = async () => {
      const response = await serverNode.getAllCasts();
      setCasts(response.data.data);
    };
    getAllCast();
    const getCastOfMovie = async () => {
      const response = await serverNode.getCastMovie(id);
      setMovieCasts(response.data.data);
    };
    getCastOfMovie();
  }, []);

  const handleAddCast = (item) => {
    if (item) {
      if (!movieCasts.some((genre) => genre.ANC_ID === item.ANC_ID)) {
        setMovieCasts([...movieCasts, item]);
        serverNode.addCastMovie(id, item.ANC_ID);
      } else {
        alert(`Already add genre ${item.ANC_NAME} to movie`);
      }
    }
  };
  const handleRemoveCast = (item) => {
    setMovieCasts(movieCasts.filter((genre) => genre.ANC_ID !== item.ANC_ID));
    serverNode.removeCastMovie(id, item.ANC_ID);
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
      <div className={cx("addnew-btn")}>
        <AddNew cast />
      </div>
    </>
  );
};
