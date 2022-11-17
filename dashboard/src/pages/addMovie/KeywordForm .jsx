import { useState, useEffect } from "react";
import classname from "classnames/bind";

import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "./AddMovie.module.scss";
import Tag from "../../components/Tag/Tag";

const cx = classname.bind(styles);

const KEYWORDS = [
  {
    KW_ID: 1,
    KW_NAME: "The movie",
  },
  {
    KW_ID: 2,
    KW_NAME: "STAN1",
  },
  {
    KW_ID: 3,
    KW_NAME: "STAN1",
  },
];

export const KeywordForm = () => {
  const [movieKeywords, setMovieKeywords] = useState([]);
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    // Lấy danh sách kw
    setKeywords(KEYWORDS);
  }, []);

  const handleAddKeyword = (item) => {
    if (item) {
      if (!movieKeywords.some((keyword) => keyword.KW_ID === item.KW_ID)) {
        setMovieKeywords([...movieKeywords, item]);
      } else {
        alert(`Already add keyword ${item.KW_NAME} to movie`);
      }
    }
  };
  const handleRemoveKeyword = (item) => {
    setMovieKeywords(
      movieKeywords.filter((keyword) => keyword.KW_ID !== item.KW_ID)
    );
  };

  return (
    <>
      <h2 className={cx("sub-title")}>Movie's Genres</h2>
      <Row>
        <Col lg={6}>
          <span>Keywords of movie</span>
          <div className={cx("keywords-container")}>
            <Row>
              {movieKeywords.map((item, index) => (
                <Tag
                  key={index}
                  item={{ name: item.KW_NAME }}
                  onClick={() => handleRemoveKeyword(item)}
                />
              ))}
            </Row>
          </div>
        </Col>
        <Col lg={6}>
          <span>List of keywords</span>
          <ul className={cx("keywords-list")}>
            <li className={cx("keyword")}>
              <span className={cx("number")}>Number</span>
              <span className={cx("name")}>Name</span>
            </li>
            {keywords.map((item, index) => (
              <li
                key={index}
                className={cx("keyword")}
                onClick={() => handleAddKeyword(item)}
              >
                <span className={cx("number")}>{index + 1}</span>
                <span className={cx("name")}>{item.KW_NAME}</span>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </>
  );
};
