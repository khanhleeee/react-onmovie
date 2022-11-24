import AddMovie from "../pages/addMovie/AddMovie";
import EditMovie from "../pages/editMovie/EditMovie";
import Movie from "../pages/movie/Movie";
import MovieList from "../pages/movieList/MovieList";
import UserList from "../pages/userList/UserList";

// Public routes
const publicRoutes = [
  { path: "/", component: MovieList },
  { path: "/movie/add", component: AddMovie },
  { path: "/movie/edit/:id", component: EditMovie },
  { path: "/movie", component: Movie },
];

// Private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
