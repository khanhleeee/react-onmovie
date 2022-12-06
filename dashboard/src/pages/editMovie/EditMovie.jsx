import classname from "classnames/bind";
import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "./editMovie.module.scss";
import { useParams } from "react-router-dom";
import { MOVIE, COUNTRY } from "../../../src/constants";
import Input from "../../components/Form/Input";
import { GenresForm } from "./GenreForm";
import { KeywordForm } from "./KeywordForm ";
import { CastForm } from "./CastForm";
import { serverNode } from "../../api/serverNode";

const cx = classname.bind(styles);

const TAB_ITEM = [
  { title: "Information" },
  { title: "Genres" },
  { title: "Casts" },
  { title: "Keywords" },
];

export default function EditMovie() {
  const [activeTab, setActiveTab] = useState(0);
  const [item, setItem] = useState([]);

  const ID = useParams().id;

  useEffect(() => {
    const getDetailsMovie = async () => {
      const response = await serverNode.getDetailMovie(ID);
      setItem(response.data.data);
    };
    getDetailsMovie();
  }, [ID]);

  return (
    <div className={cx("container")}>
      <h2 className={cx("title")}>Edit movie: {item[MOVIE.name]}</h2>
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
        {activeTab === 0 && <Information id={ID} film={item} />}
        {activeTab === 1 && <GenresForm id={ID} />}
        {activeTab === 2 && <CastForm id={ID} />}
        {activeTab === 3 && <KeywordForm id={ID} />}
      </div>
    </div>
  );
}

const Information = ({ id, film }) => {
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

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getAllCountries = async () => {
      const response = await serverNode.getAllCountries();
      setCountries(response.data.data);
    };
    getAllCountries();
  }, []);

  const [detailValues, setDetailValues] = useState({
    [MOVIE.name]: "",
    [MOVIE.release_date]: "",
    [MOVIE.backdrop]: "",
    [MOVIE.poster]: "",
    [MOVIE.desc]: "",
    [MOVIE.age]: "",
    [MOVIE.country]: "",
  });

  useEffect(() => {
    setDetailValues({ ...film });
  }, [film]);
  console.log(detailValues);

  const handleOnchange = (e) => {
    setDetailValues({ ...detailValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await serverNode.editDetailMovie(id, detailValues);
    window.location.href = "/";
  };

  return (
    <div className={cx("info")}>
      <h2 className={cx("sub-title")}>Movie's Details</h2>
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
      <div className={cx("btn-wrapper")}>
        <button className={cx("update-btn")} onClick={handleSubmit}>
          UPDATE
        </button>
      </div>
    </div>
  );
};
