import classes from "./Cart.module.css";
import Modal from "../ui/modal/Modal";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./cart-item/CartItem";

const Cart = (props) => {
  const context = useContext(CartContext);
  const hasItems = context.items.length > 0;
  const totalAmount = `$${context.totalAmount.toFixed(2)}`;
  const cartItemAddHandler = (item) =>
    context.addItem({
      ...item,
      amount: 1,
    });
  const cartItemRemoveHandler = (id) => context.removeItem(id);
  const carItems = context.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onAdd={cartItemAddHandler.bind(null, item)}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
    />
  ));

  return (
    <Modal onBackdropClick={props.onClose}>
      <ul className={classes["cart-items"]}>{carItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
