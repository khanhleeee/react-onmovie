import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";

import "./movie.css";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getDetailMovie, upgradeMovie } from "../../actions/index";
import { useEffect } from "react";

export default function Movie() {
  const location = useLocation();
  const movie = location.movie;

  const [movieDetail, setMovieDetail] = useState({});

  const [updateMovieObject, setUpdateMovie] = useState(null);
  const [subtitle, setSubtitle] = useState(null);
  const { dispatch } = useContext(MovieContext);

  console.log(movie);

  useEffect(() => {
    const detail = async () => {
      await getDetailMovie(movie.F_ID).then((res) => {
        console.log(res.data);
        setMovieDetail(res.data);
      });
    };
    detail();
  }, []);

  const handleInput = (e) => {
    const value = e.target.value;
    setSubtitle({ ...subtitle, [e.target.name]: value });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdateMovie({ ...updateMovieObject, [e.target.name]: value, subtitle });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    upgradeMovie(movie.F_ID, updateMovieObject, dispatch);
    // .then((res) => {
    //     console.log(res)
    // //     dispatch({
    // //         type: "UPDATE_USER_SUCCESS",
    // //         payload: dataUser,
    // //     });
    // })
    window.location.href = "/movies";
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newMovie">
          <button className="productAddBtn">Create</button>
        </Link>
        <button className="productBtn" onClick={handleSubmit}>
          Update
        </button>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              className="productInfoImg"
              src={movieDetail.F_POSTER}
              alt={movieDetail.F_OFFICIAL_NAME}
            />
            <span className="productName">
              {movieDetail.F_OFFICIAL_NAME} / {movieDetail.F_PREFERENCED_NAME}
            </span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">ID:</span>
              <span className="productInfoValue">{movieDetail.F_ID}</span>
            </div>
            <div className="product-infoItem">
              <span className="productInfoKey">Description:</span>
              <span className="productInfoValue">{movieDetail.F_DESC}</span>
            </div>
            <div className="product-infoItem">
              <span className="productInfoKey">Genre:</span>
            </div>
            <div className="product-infoItem">
              <span className="productInfoKey">Ratting:</span>
              <span className="productInfoValue">
                {movieDetail.F_AVGRATING}
              </span>
            </div>
            <div className="product-infoItem">
              <span className="productInfoKey">Limited:</span>
              <span className="productInfoValue">
                {movieDetail.F_LIMITEDAGE}
              </span>
            </div>
            <div className="product-infoItem">
              <span className="productInfoKey">Year:</span>
              <span className="productInfoValue">
                {movieDetail.F_RELEASEYEAR}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input
              className="form-input"
              type="text"
              placeholder={movieDetail.F_OFFICIAL_NAME}
              name="title"
              onChange={handleChange}
            />
            <label>Description</label>
            <input
              className="form-input"
              type="text"
              placeholder={movieDetail.F_DESC}
              name="description"
              onChange={handleChange}
            />
            <label>Year</label>
            <input
              className="form-input"
              type="text"
              placeholder={movieDetail.F_RELEASEYEAR}
              name="year"
              onChange={handleChange}
            />
            <label>Ratting</label>
            <input
              className="form-input"
              type="text"
              placeholder={movieDetail.F_AVGRATING}
              name="genre"
              onChange={handleChange}
            />
            <label>Limit</label>
            <input
              className="form-input"
              type="text"
              placeholder={movieDetail.F_LIMITEDAGE}
              name="limit"
              onChange={handleChange}
            />
          </div>
          <div className="product-img-container">
            <div className="product-imgs">
              <span className="product-img-title">Poster</span>
              <img src={movieDetail.F_POSTER} alt="" className="product-img" />
              <input
                className="product-img-input"
                type="text"
                id="img"
                name="img"
                placeholder={movieDetail.F_POSTER}
                onChange={handleChange}
              />
            </div>
            <div className="product-imgs">
              <span className="product-img-title">Backdrop</span>
              <img
                src={movieDetail.F_BACKDROP}
                alt=""
                className="product-img"
              />
              <input
                className="product-img-input"
                type="text"
                id="imgTitle"
                name="imgTitle"
                placeholder={movieDetail.F_POSTER}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
