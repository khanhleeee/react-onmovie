import classname from "classnames/bind";
import { DeleteIcon } from "../Icons/Icons";

import styles from "./CastCard.module.scss";

const cx = classname.bind(styles);

function CastCard(props) {
  return (
    <div className={cx("castcard")}>
      <div
        className={cx("img-container")}
        style={{
          backgroundImage: `url(${props.item.ANC_AVATAR})`,
        }}
      ></div>
      <span className={cx("name")}>{props.item.ANC_NAME}</span>
      <DeleteIcon className={cx("remove-btn")} onClick={props.onClick} />
    </div>
  );
}

export default CastCard;
