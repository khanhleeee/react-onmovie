import { useState } from "react";
import { Link } from "react-router-dom";
import classname from "classnames/bind";

import styles from "./sidebar.module.scss";
import { PlayCircleFilledOutlined } from "@material-ui/icons";

const cx = classname.bind(styles);

export default function Sidebar() {
  const [active, setActive] = useState("movies");

  return (
    <div className={cx("sidebar")}>
      <div className={cx("wrapper")}>
        <ul className={cx("menu")}>
          <li
            className={active === "movies" ? cx("active") : ""}
            onClick={() => setActive("movies")}
          >
            <Link to="/">
              <PlayCircleFilledOutlined className={cx("icon")} />
              <span>Movie List</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
