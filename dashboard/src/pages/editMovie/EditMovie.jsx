import classname from "classnames/bind";
import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "./editMovie.module.scss";
import { useParams } from "react-router-dom";
import { MOVIE } from "../../../src/constants";
import Input from "../../components/Form/Input";
import { GenresForm } from "./GenreForm";
import { KeywordForm } from "./KeywordForm ";
import { CastForm } from "./CastForm";

const cx = classname.bind(styles);

const TAB_ITEM = [
  { title: "Information" },
  { title: "Genres" },
  { title: "Casts" },
  { title: "Keywords" },
];

function EditMovie() {
  const [activeTab, setActiveTab] = useState(0);

  const ID = useParams().id;

  return (
    <div className={cx("container")}>
      <h2 className={cx("title")}>Edit movie</h2>
      <ul className={cx("tab-container")}>
        {TAB_ITEM.map((item, index) => (
          <li
            key={index}
            className={activeTab === index ? cx("active") : ""}
            onClick={() => setActiveTab(index)}
          >
            {item.title}
          </li>
        ))}
      </ul>
      <div className={cx("content")}>
        {activeTab === 0 && <Information id={ID} />}
        {activeTab === 1 && <GenresForm />}
        {activeTab === 2 && <CastForm />}
        {activeTab === 3 && <KeywordForm />}
      </div>
    </div>
  );
}

const Information = ({ id }) => {
  const DETAIL_INPUTS = [
    {
      name: [MOVIE.name],
      type: "text",
      label: "Name",
      placeholder: "Movie name",
      columns: "8",
    },
    {
      name: [MOVIE.release_date],
      type: "date",
      label: "Release date",
      placeholder: "Release date",
      columns: "4",
    },
    {
      name: [MOVIE.backdrop],
      type: "text",
      label: "Backdrop link",
      placeholder: "http:://....",
      columns: "6",
    },
    {
      name: [MOVIE.poster],
      type: "text",
      label: "Poster link",
      placeholder: "http:://....",
      columns: "6",
    },
    {
      name: [MOVIE.desc],
      label: "Description",
      placeholder: "Telling about a girl......",
      textarea: "textarea",
      columns: "12",
    },
  ];
  const FILM = {
    [MOVIE.name]: "Avatar",
    [MOVIE.release_date]: "05/05/2022",
    [MOVIE.backdrop]:
      "https://www.themoviedb.org/t/p/original/lVIKnXtJ5J8ITGEiPy7skbAbJBR.jpg",
    [MOVIE.poster]:
      "https://www.themoviedb.org/t/p/original/ypwTbN8T8DsnAoaB7KSgVPKilFi.jpg",
    [MOVIE.desc]:
      "Mối quan hệ của đôi bạn thân Sophie và Agatha bị thử thách khi họ bị đưa đến ngôi trường phép thuật dành cho anh hùng và ác nhân tương lai trong truyện cổ tích.",
  };

  const [detailValues, setDetailValues] = useState({
    [MOVIE.name]: "",
    [MOVIE.date]: "",
    [MOVIE.backdrop]: "",
    [MOVIE.poster]: "",
    [MOVIE.desc]: "",
  });
  const [film, setFilm] = useState(null);

  useEffect(() => {
    // Get film detail
    setFilm(FILM);
    console.log(film);
  }, []);

  const handleOnchange = (e) => {
    setDetailValues({ ...detailValues, [e.target.name]: e.target.value });
  };

  return (
    <div className={cx("info")}>
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
      <div className={cx("btn-wrapper")}>
        <button className={cx("update-btn")}>UPDATE</button>
      </div>
    </div>
  );
};

export default EditMovie;
