import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import LogIn from "./pages/auth/LogIn";
import MovieList from "./pages/movieList/MovieList";
import { publicRoutes } from "./routes";

export default function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={
            user ? (
              <>
                <Topbar />
                  <div className="flex">
                    <Sidebar />
                    <MovieList />
                  </div>
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          exact
          element={!user ? <LogIn /> : <Navigate to="/" />}
        />
        {user && publicRoutes.map((route, i) => {
          const Component = route.component;
          return (
            <Route
              key={i}
              path={route.path}
              element={
                <>
                  <Topbar />
                  <div className="flex">
                    <Sidebar />
                    <Component />
                  </div>
                </>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

