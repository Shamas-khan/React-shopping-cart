import { useCartData } from "../context/CartContext";

export const Cart = () => {
  const { state, dispatch } = useCartData();
console.log(state);
  const removeFromCart = (product) => {
    dispatch({ type: "REMOVE_ITEM", payload: product });
  };
  const changeQty = (product, change) => {
    const item = state.items.find((item) => item.product.id === product.id);
    const newQuantity = item.quantity + change;

    if (newQuantity > 0) {
      dispatch({ type: "HANDLE_QTY", payload: { id: product.id, quantity: newQuantity } });
    } else {
      removeFromCart(product);
    }
  };
  return (
    <>
      <div className="container mx-auto flex flex-col">
        <div className="flex flex-wrap">
          {state.items.length === 0 ? (
            <p>No products found</p>
          ) : (
            state.items.map((item) => (
              <div
                key={item.product.id}
                className="card shadow-[1px_-2px_6px_4px_rgba(93,69,191,1)] w-full bg-base-100 shadow-xl flex-row p-3 mx-2 my-4"
              >
                <figure className="w-[10%] rounded-md">
                  <img src={item.product.images[0]} alt="Product" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.product.name}</h2>
                  <div className="flex">
                    <p>$ {item.product.price}</p>
                    <p className="ml-4">Quantity: {item.quantity}</p>
                    <div className="flex items-center justify-between w-24 ml-4">
                      <button onClick={() => changeQty(item.product, -1)} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                        -
                      </button>
                      <span className="text-lg">{item.quantity}</span>
                      <button onClick={() => changeQty(item.product, 1)} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-primary ml-4"
                      onClick={() => removeFromCart(item.product)}
                    >
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div class="card w-96 bg-base-100 shadow-xl self-end">
        <div class="card-body">
          <h2 className="card-title">Cart Detail</h2>
          <p>Product: <span>{state.items.length}</span></p>
          <p>Total Price: <span>${state.total}</span></p>
          
        </div>
      </div>
      </div>
    </>
  );
};
