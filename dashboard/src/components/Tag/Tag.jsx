import classname from "classnames/bind";
import { DeleteIcon } from "../Icons/Icons";

import styles from "./Tag.module.scss";

const cx = classname.bind(styles);

function Tag(props) {
  return (
    <div className={cx("tag")}>
      <span className={cx("name")}>{props.item.name}</span>
      <DeleteIcon className={cx("remove-btn")} onClick={props.onClick} />
    </div>
  );
}

export default Tag;
