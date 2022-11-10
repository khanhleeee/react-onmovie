import Movie from "../pages/movie/Movie";
import MovieList from "../pages/movieList/MovieList";
import UserList from "../pages/userList/UserList";

// Public routes
const publicRoutes = [
  { path: "/", component: MovieList },
  { path: "/users", component: UserList },
  { path: "/movie", component: Movie },
];

// Private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
