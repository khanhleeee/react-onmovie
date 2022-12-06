import classname from "classnames/bind";
import { useEffect, useState } from "react";
import { serverNode } from "../../api/serverNode";
import { ACTOR } from "../../constants";

import styles from "./AddNew.module.scss";

const cx = classname.bind(styles);

export default function AddNew(props) {
  const [active, setActive] = useState(1);

  const [value, setValue] = useState("");

  const [castValue, setCastValue] = useState({
    [ACTOR.name]: "",
    [ACTOR.avatar]: "",
    [ACTOR.role]: 1,
  });

  useEffect(() => {
    if (props.genre || props.keyword) {
      setActive(1);
    } else {
      setActive(2);
    }
  }, [active]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (props.genre) {
      serverNode.addMoreGenre(value);
      props.setResetGenre(true);
      setValue("");
    } else if (props.keyword) {
      serverNode.addMoreKeyword(value);
      props.setResetKeyword(true);
      setValue("");
    } else if (props.cast) {
      serverNode.addMoreCast(castValue);
      props.setResetCast(true);
      setCastValue({
        [ACTOR.name]: "",
        [ACTOR.avatar]: "",
      });
    }
  };

  return (
    <>
      {active === 1 && (
        <div className={cx("addnew")}>
          <div className={cx("container")}>
            <input
              className={cx("input")}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder={props.genre ? "New genre" : "New keyword"}
            />
          </div>
        </div>
      )}
      {active === 2 && (
        <div className={cx("addnew", "horizontal")}>
          <div className={cx("container")}>
            <input
              className={cx("input")}
              value={castValue[ACTOR.name]}
              onChange={(e) =>
                setCastValue({ ...castValue, [ACTOR.name]: e.target.value })
              }
              type="text"
              placeholder="Cast's name"
            />
          </div>
          <div className={cx("container")}>
            <input
              className={cx("input")}
              value={castValue[ACTOR.avatar]}
              onChange={(e) =>
                setCastValue({ ...castValue, [ACTOR.avatar]: e.target.value })
              }
              type="text"
              placeholder="Cast's avatar"
            />
          </div>
        </div>
      )}
      <div className={cx("add-btn")} onClick={handleAdd}>
        Add new
      </div>
    </>
  );
}
