import CartIcon from "../../cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";

const HeaderCartButton = (props) => {
  const context = useContext(CartContext);
  const numberOfCartItems = context.items.reduce(
    (count, item) => count + item.amount,
    0
  );

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
