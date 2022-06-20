import { useState, useEffect, useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (emailState, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: emailState.value, isValid: emailState.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (passwordState, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: passwordState.value,
      isValid: passwordState.value.trim().length > 6,
    };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const context = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  // 'emailIsValid' is an alias to a destructured object property (isValid)
  const { isValid: emailIsValid } = emailState;
  // 'passwordIsValid' is an alias to a destructured object property (isValid)
  // const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Check validity!");
      setFormIsValid(emailIsValid && passwordState.isValid);
    }, 500);
    // an effect can return a cleanup function which is executed before the effect itself,
    // but not before the very first execution
    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
    // using the 'isValid' alias or value is better than using the entire object, because the effect
    // gets executed only when the concrete properties change
  }, [emailIsValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      context.onLogin(emailState.value, passwordState.value);
    } else if (!emailState.isValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          type="email"
          label="E-Mail"
          value={emailState.value}
          isValid={emailState.isValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          type="password"
          label="Password"
          value={passwordState.value}
          isValid={passwordState.isValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
