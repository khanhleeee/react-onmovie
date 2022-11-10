import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import { AuthContext } from "./context/authContext/AuthContext";

import { publicRoutes } from "./routes";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* <Route path="/login">{user ? <Redirect to="/" /> : <Login />} </Route> */}
        {user &&
          publicRoutes.map((route, i) => {
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

export default App;
