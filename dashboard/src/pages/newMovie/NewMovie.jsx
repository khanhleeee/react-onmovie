import {useState, useContext} from 'react';

import "./newMovie.css";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { createMovie } from "../../context/movieContext/apiCall";

export default function NewProduct() {
  const [movie, setMovie] = useState(null);
  const [subtitle, setSubtitle] = useState(null);

  const { dispatch } = useContext(MovieContext);

  const handleInput = (e) => {
    const value = e.target.value;
    setSubtitle({...subtitle, [e.target.name]: value});
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value, subtitle });
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
    window.location.href="/movies";
    // history.push("/movies");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Poster</label>
          <input type="text" id="img" name="img" onChange={handleChange} placeholder="Url image cover"/>
        </div>
        <div className="addProductItem">
          <label>Backdrop</label>
          <input type="text" id="imgTitle" name="imgTitle" onChange={handleChange} placeholder="Url image title" />
        </div>
        <div className="addProductItem">
          <label>Movie Name</label>
          <input type="text" name="title" onChange={handleChange}  placeholder="Movie title"  />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" name="description" onChange={handleChange}  placeholder="Movie description"  />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" name="genre" onChange={handleChange} placeholder="Moive genre" />
        </div>
        <div className="addProductItem">
          <label>Release Year</label>
          <input type="text" name="year" onChange={handleChange}  placeholder="Publish year"  />
        </div>
        <div className="addProductItem">
          <label>Limited Age</label>
          <input type="text" name="limit" onChange={handleChange}  placeholder="Age limit" />
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="text" name="trailer" onChange={handleChange}  placeholder="Url Image"/>
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="text" name="video" onChange={handleChange} placeholder="Url video" />
        </div>
        <button className="addProductButton" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}
