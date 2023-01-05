import { Link } from "react-router-dom";
import classname from "classnames/bind";

import styles from "./topbar.module.scss";
const cx = classname.bind(styles);

const user = JSON.parse(localStorage.getItem("user"));

export default function Topbar() {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

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
            <Link to={{ pathname: "/user/" + user.U_ID, users: user }}>
              <img
                src={
                  user.U_AVATAR !== null ? "https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/288230799_2823511521285420_7250080695985063274_n.jpg?stp=dst-jpg_p720x720&_nc_cat=106&ccb=1-7&_nc_sid=0debeb&_nc_ohc=B5tn-54j8OYAX983XPu&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfBS54zUQLym5G1WkPQZsaU4-8pe_TquJD71f9ecPdrikw&oe=639750C0"
                  : user.U_AVATAR
                }
                alt="avatar"
                className={cx("topAvatar")}
              />
            </Link>
            <ul className={cx("dropdown")}>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
