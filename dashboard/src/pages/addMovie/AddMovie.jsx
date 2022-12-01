import { useState } from "react";
import classname from "classnames/bind";

import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Input from "../../components/Form/Input";
import styles from "./AddMovie.module.scss";
import { GenresForm } from "./GenreForm";
import { KeywordForm } from "./KeywordForm ";
import { CastForm } from "./CastForm";

const cx = classname.bind(styles);

function AddMovie() {
  const [detailValues, setDetailValues] = useState({
    F_OFFICIAL_NAME: "",
    F_RELEASE_DATE: "",
    F_BACKDROP: "",
    F_POSTER: "",
    F_DESC: "",
  });

  const [movieGenres, setMovieGenres] = useState([]);
  const [movieCasts, setMovieCasts] = useState([]);
  const [movieKeywords, setMovieKeywords] = useState([]);

  const handleOnchange = (e) => {
    setDetailValues({ ...detailValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={cx("container")}>
      <h2 className={cx("title")}>Add movie</h2>
      <form onSubmit={handleSubmit} className={cx("detail-form")}>
        <MovieDetailForm
          detailValues={detailValues}
          handleOnchange={handleOnchange}
        />
        <GenresForm movieGenres={movieGenres} setMovieGenres={setMovieGenres} />
        <KeywordForm
          movieKeywords={movieKeywords}
          setMovieKeywords={setMovieKeywords}
        />
        <CastForm movieCasts={movieCasts} setMovieCasts={setMovieCasts} />
        <Row>
          <Col className={cx("submit-wrapper")} md={{ span: 6, offset: 6 }}>
            <button className={cx("submit-btn")} type="submit">
              Create new
            </button>
          </Col>
        </Row>
      </form>
    </div>
  );
}

const MovieDetailForm = ({ detailValues, handleOnchange }) => {
  const DETAIL_INPUTS = [
    {
      name: "F_OFFICIAL_NAME",
      type: "text",
      label: "Name",
      placeholder: "Movie name",
      columns: "8",
    },
    {
      name: "F_RELEASE_DATE",
      type: "date",
      label: "Release date",
      placeholder: "Release date",
      columns: "4",
    },
    {
      name: "F_BACKDROP",
      type: "text",
      label: "Backdrop link",
      placeholder: "http:://....",
      columns: "6",
    },
    {
      name: "F_POSTER",
      type: "text",
      label: "Poster link",
      placeholder: "http:://....",
      columns: "6",
    },
    {
      name: "F_DESC",
      label: "Description",
      placeholder: "Telling about a girl......",
      textarea: "textarea",
      columns: "12",
    },
  ];

  return (
    <>
      <h2 className={cx("sub-title")}>Movie's details</h2>
      <Row>
        {DETAIL_INPUTS.map((input, index) => (
          <Col key={index} sm={12} lg={input.columns}>
            <Input
              {...input}
              value={detailValues[input.name]}
              onChange={handleOnchange}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AddMovie;
