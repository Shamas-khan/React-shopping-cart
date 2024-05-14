import React ,{useContext, useEffect, useReducer} from 'react'

const initialState = {
    items: [],
    total: 0
  };

  const cart=(state,action)=>{
    switch(action.type){
        case "ADD_TO_CART":
            return{
                ...state,
                items: [...state.items, action.payload],
                total: state.total + action.payload.price
            }
            case 'REMOVE_ITEM':
                const updatedItems = state.items.filter(item => item.id !== action.payload.id);
                return {
                  ...state,
                  items: updatedItems,
                  total: state.total - action.payload.price
                };
              default:
                return state;
            }
          }

export const CartContext = React.createContext();


export function CartProvider({ children }) {
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  const [state, dispatch] = useReducer(cart, storedCart || initialState);
console.log("state reducer",state);

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