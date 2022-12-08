import { useEffect, useState } from "react";
import classname from "classnames/bind";

import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Input from "../../components/Form/Input";
import styles from "./AddMovie.module.scss";
import { GenresForm } from "./GenreForm";
import { KeywordForm } from "./KeywordForm ";
import { CastForm } from "./CastForm";
import { COUNTRY, MOVIE } from "../../../src/constants";
import { serverNode } from "../../api/serverNode";
const cx = classname.bind(styles);

export default function AddMovie() {
  const [detailValues, setDetailValues] = useState({
    [MOVIE.name]: "",
    [MOVIE.release_date]: "",
    [MOVIE.backdrop]: "",
    [MOVIE.poster]: "",
    [MOVIE.desc]: "",
    [MOVIE.age]: "",
    [MOVIE.country]: "",
    [MOVIE.sourceID]: "",
    [MOVIE.trailerID]: "",
  });

  const [movieGenres, setMovieGenres] = useState([]);
  const [movieCasts, setMovieCasts] = useState([]);
  const [movieKeywords, setMovieKeywords] = useState([]);

  const handleOnchange = async (e) => {
    setDetailValues({ ...detailValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      detailValues,
      movieGenres,
      movieCasts,
      movieKeywords,
    });
    serverNode.addMovie({
      detailValues,
      movieGenres,
      movieCasts,
      movieKeywords,
    });
    window.location.href = "/";
  };

  return (
    <div className={cx("container")}>
      <h2 className={cx("title")}>Add movie</h2>
      <form onSubmit={handleSubmit} className={cx("detail-form")}>
        <MovieDetailForm
          detailValues={detailValues}
          setDetailValues={setDetailValues}
          handleOnchange={handleOnchange}
        />
        <GenresForm movieGenres={movieGenres} setMovieGenres={setMovieGenres} />
        <KeywordForm
          movieKeywords={movieKeywords}
          setMovieKeywords={setMovieKeywords}
        />
        <CastForm movieCasts={movieCasts} setMovieCasts={setMovieCasts} />
        <Row>
          <Col className={cx("submit-wrapper")} md={12}>
            <button className={cx("submit-btn")} type="submit">
              Create new
            </button>
          </Col>
        </Row>
      </form>
    </div>
  );
}

const MovieDetailForm = ({ detailValues, setDetailValues, handleOnchange }) => {
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

  const [countries, setCountries] = useState([]);
  useEffect(() => {
    serverNode.getAllCountries().then((res) => {
      setCountries(res.data.data);
    });
  }, []);

  return (
    <>
      <h2 className={cx("sub-title")}>Movie's details</h2>
      <Row>
        <Col sm={12} lg={3}>
          <label>Nation</label>
          <select
            className={cx("dropdown")}
            name="C_ID"
            value={detailValues.C_ID}
            onChange={(e) =>
              setDetailValues({
                ...detailValues,
                C_ID: e.target.value,
              })
            }
          >
            {countries.map((item, index) => (
              <option key={index} value={item[COUNTRY.id]}>
                {item[COUNTRY.name]}
              </option>
            ))}
          </select>
        </Col>
        <Col sm={12} lg={3}>
          <label>Limited age</label>
          <select
            className={cx("dropdown")}
            name="F_AGE"
            value={detailValues.F_AGE}
            onChange={(e) =>
              setDetailValues({
                ...detailValues,
                F_AGE: e.target.value,
              })
            }
          >
            <option value="12">Above 12</option>
            <option value="13">Above 13</option>
            <option value="14">Above 14</option>
            <option value="15">Above 15</option>
            <option value="16">Above 16</option>
            <option value="17">Above 17</option>
            <option value="18">Above 18</option>
            <option value="19">Above 19</option>
            <option value="20">Above 20</option>
            <option value="21">Above 21</option>
          </select>
        </Col>
        <Col sm={12} lg={3}>
          <Input
            label="Source ID"
            placeholder="eg: 0123"
            value={detailValues[MOVIE.sourceID]}
            onChange={(e) =>
              setDetailValues({
                ...detailValues,
                [MOVIE.sourceID]: e.target.value,
              })
            }
          />
        </Col>
        <Col sm={12} lg={3}>
          <Input
            label="Trailer ID"
            placeholder="eg: 0123"
            value={detailValues[MOVIE.trailerID]}
            onChange={(e) =>
              setDetailValues({
                ...detailValues,
                [MOVIE.trailerID]: e.target.value,
              })
            }
          />
        </Col>
      </Row>
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
