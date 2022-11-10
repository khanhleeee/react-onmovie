import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import classname from "classnames/bind";
import { DeleteOutline } from "@material-ui/icons";

import styles from "./movieList.module.scss";
import { DataGrid } from "@material-ui/data-grid";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovies, deleteMovie } from "../../context/movieContext/apiCall";

const cx = classname.bind(styles);

export default function ProductList() {
  const { movies, dispatch } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
  };

  const userData = [
    {
      fullname: "Jan",
      user: 4000,
    },
  ];

  const columns = [
    { field: "user", headerName: "ID", width: 100 },
    {
      field: "fullname",
      headerName: "Official Name",
      headerClassName: "super-app-theme--header",
      width: 220,
      renderCell: (params) => {
        return (
          <div className={cx("productListItem")}>
            <img
              className="productListImg"
              src={params.row.F_POSTER}
              alt={params.row.F_OFFICIAL_NAME}
            />
            {params.row.F_OFFICIAL_NAME}
          </div>
        );
      },
    },
    { field: "F_DESC", headerName: "Description", width: 250 },
    { field: "F_LIMITEDAGE", headerName: "Limited Age", width: 150 },
    { field: "F_AVGRATING", headerName: "Ratting", width: 130 },
    { field: "F_RELEASEYEAR", headerName: "Release Year", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/movie/" + params.row.F_ID, movie: params.row }}
            >
              <button className={cx("productListEdit")}>Edit</button>
            </Link>
            <DeleteOutline
              className={cx("productListDelete")}
              onClick={() => handleDelete(params.row.F_ID)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className={cx("productList")}>
      <DataGrid
        rows={movies.map((movie) => ({
          id: movie.F_ID,
          ...movie,
        }))}
        getRowId={(row) => row.F_ID}
        disableSelectionOnClick
        columns={columns}
        pageSize={11}
        checkboxSelection
      />
    </div>
  );
}
