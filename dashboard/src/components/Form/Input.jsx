import classname from "classnames/bind";

import styles from "./Form.module.scss";

const cx = classname.bind(styles);

function Input(props) {
  const { label, onChange, value, ...inputprops } = props;
  let Component = "input";
  let classes = cx("form-group", props.className);

  if (props.textarea) {
    Component = "textarea";
  }

  return (
    <div className={classes}>
      <label>{label}</label>
      <div className={cx("input-warraper")}>
        <Component value={value} {...inputprops} onChange={props.onChange} />
      </div>
    </div>
  );
}

export default Input;
