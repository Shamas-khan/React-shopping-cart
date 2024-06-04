import React, { useContext, useEffect, useReducer } from "react";

const initialState = {
  items: [],
  total: 0,
};

const cart = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItem = { product: action.payload, quantity: 1 };
      return {
        ...state,
        items: [...state.items, newItem],
        total: state.total + newItem.product.price * newItem.quantity,
      };
    case "REMOVE_ITEM":
      const updatedItems = state.items.filter(
        (item) => item.product.id !== action.payload.id
      );
      const removedItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (!removedItem) return state; // If item to remove is not found, return current state
      
      return {
        ...state,
        items: updatedItems,
        total: state.total - removedItem.product.price * removedItem.quantity,
      };

      case "HANDLE_QTY":
        const updatedItemsQty = state.items.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
  
        const updatedTotal = updatedItemsQty.reduce((acc, item) => {
          return acc + item.product.price * item.quantity;
        }, 0);
  
        return {
          ...state,
          items: updatedItemsQty,
          total: updatedTotal,
        };
      default:
        return state;
    }
  }


export const CartContext = React.createContext();

export function CartProvider({ children }) {
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  const [state, dispatch] = useReducer(cart, storedCart || initialState);
  console.log("state reducer", state);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartData = () => useContext(CartContext);
