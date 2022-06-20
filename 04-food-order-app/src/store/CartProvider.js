import CartContext from "./cart-context";
import { useState, useReducer } from "react";

const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const updateItemsOnAdd = (state, newItem) => {
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === newItem.id
  );
  const existingItem = state.items[existingItemIndex];
  if (existingItem) {
    const updatedItems = [...state.items];
    updatedItems[existingItemIndex] = {
      ...existingItem,
      amount: existingItem.amount + newItem.amount,
    };
    return updatedItems;
  }
  return state.items.concat(newItem);
};

const updateItemsOnRemove = (state, existingItem) => {
  if (existingItem.amount === 1) {
    return state.items.filter((item) => item.id !== existingItem.id);
  }
  existingItem.amount--;
  return [...state.items];
};

const cartReducer = (state, action) => {
  if (action.type === ADD_ITEM) {
    return {
      items: updateItemsOnAdd(state, action.item),
      totalAmount: state.totalAmount + action.item.price * action.item.amount,
    };
  }
  if (action.type === REMOVE_ITEM) {
    const itemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[itemIndex];
    return {
      items: updateItemsOnRemove(state, existingItem),
      totalAmount: state.totalAmount - existingItem.price,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartStateAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartStateAction({ type: ADD_ITEM, item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartStateAction({ type: REMOVE_ITEM, id });
  };

  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
