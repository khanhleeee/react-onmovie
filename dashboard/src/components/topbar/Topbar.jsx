import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classname from "classnames/bind";

import styles from "./topbar.module.scss";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { AuthContext } from "../../context/authContext/AuthContext";

const cx = classname.bind(styles);

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);

  return (
    <div className={cx("topbar")}>
      <div className={cx("topbarWrapper")}>
        <div className={cx("topLeft")}>
          <Link to="/" className="logo">
            <span>on</span>
            <span>Movie</span>
          </Link>
        </div>
        <div className={cx("topRight")}>
          <div className={cx("dropdownProfile")}>
            <Link to={{ pathname: "/user/" + user._id, users: user }}>
              <img
                src={
                  user.avatar ||
                  "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
                }
                alt="avatar"
                className={cx("topAvatar")}
              />
            </Link>
            <ul className={cx("dropdown")}>
              <li>Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
