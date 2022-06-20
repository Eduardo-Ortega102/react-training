import classes from "./Cart.module.css";
import Modal from "../ui/modal/Modal";

const Cart = (props) => {
  const carItems = [{ id: "c1", name: "dasdas", amount: 3, price: 12.99 }].map(
    (item) => <li key={item.id}>{item.name}</li>
  );

  return (
    <Modal onBackdropClick={props.onClose}>
      <ul>{carItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>369.36</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
