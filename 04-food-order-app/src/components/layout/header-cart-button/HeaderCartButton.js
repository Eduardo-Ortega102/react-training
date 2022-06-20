import CartIcon from "../../cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../../store/cart-context";

const HeaderCartButton = (props) => {
  const context = useContext(CartContext);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const numberOfCartItems = context.items.reduce(
    (count, item) => count + item.amount,
    0
  );
  const buttonClasses = `${classes.button} ${
    shouldAnimate ? classes.bump : ""
  }`;

  useEffect(() => {
    if (numberOfCartItems === 0) {
      return;
    }
    setShouldAnimate(true);
    const identifier = setTimeout(() => setShouldAnimate(false), 300);
    return () => clearTimeout(identifier);
  }, [numberOfCartItems]);

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
