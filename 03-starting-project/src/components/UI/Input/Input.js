import { forwardRef, useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

const Input = forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  // The 'useImperativeHandle' should be the last approach to implement something
  useImperativeHandle(ref, () => ({
    focus: activate,
  }));

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        id={props.id}
        type={props.type}
        value={props.value}
        onBlur={props.onBlur}
        onChange={props.onChange}
      />
    </div>
  );
});

export default Input;
