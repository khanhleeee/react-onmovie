import classname from "classnames/bind";
import { useEffect, useState } from "react";

import styles from "./AddNew.module.scss";

const cx = classname.bind(styles);

function AddNew(props) {
  const [active, setActive] = useState(1);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (props.genre || props.keyword) {
      setActive(1);
    } else {
      setActive(2);
    }
  }, [active]);

  const handleAdd = () => {
    if (props.genre) {
      //goi sp_addnewgenre
    } else if (props.keyword) {
      //goi sp_addnewkeyword
    } else if (props.cast) {
      //goi sp_addnewcast
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
      {active === 2 && <div className={cx("addnew")}>hello</div>}
      <div className={cx("add-btn")} onClick={handleAdd}>
        Add new
      </div>
    </>
  );
}

export default AddNew;
