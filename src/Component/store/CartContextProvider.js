import React, { useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
  if (action.type === "NEW_ITEM") {
    let updatedItem;
    const index = state.items.findIndex((item) => item.id === action.val.id);
    if (index === -1) {
      updatedItem = state.items.concat(action.val);
    } else {
      const temp = state.items;
      temp[index].amount = temp[index].amount + action.val.amount;
      updatedItem = temp;
    }
    const updatedAmount =
      state.totalAmount + action.val.price * action.val.amount;
    return { items: updatedItem, totalAmount: updatedAmount };
  } else if (action.type === "REMOVE_ITEM") {
    const temp = state.items;
    const index = state.items.findIndex((item) => item.id === action.id);
    const updatedAmount = state.totalAmount - state.items[index].price;
    if (temp[index].amount > 1) {
      temp[index].amount--;
    } else {
      temp.splice(index, 1);
    }

    return { items: temp, totalAmount: updatedAmount };
  } else if (action.type === "REMOVE_ALL_ITEMS") {
    return { items: [], totalAmount: 0 };
  }
  return {
    items: [],
    totalAmount: 0,
  };
};

function CartContextProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
  });

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "NEW_ITEM", val: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };
  const removeAllItemsFromCartHandler = () => {
    dispatchCartAction({ type: "REMOVE_ALL_ITEMS" });
  };

  const cartContext = {
    items: cartState.items,
    amount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    removeAllItems: removeAllItemsFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
