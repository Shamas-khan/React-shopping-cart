import { ApiProvider } from "./ApiContexts";
import { CartProvider } from "./CartContext";

export function ContextWrapper({children}){
    return(
        <ApiProvider>
        <CartProvider>
          {children}
        </CartProvider>
        </ApiProvider>
    )
}