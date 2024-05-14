import { useApi } from "../hook/useApi";
import { Spinner } from "../components/Spinner";
import { useApiData } from "../context/ApiContexts";
import {useCartData} from "../context/CartContext"


const Home = () => {
  const { data, loading, error } = useApiData();
  const { state, dispatch } = useCartData();

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  const removeToCart = (product) => {
    dispatch({ type: "REMOVE_ITEM", payload: product });
  };


  return (
    <>
      <div className="container mx-auto ">
        <div className="flex flex-wrap  ">
          {loading && <Spinner />}
          {data &&
            data.products &&
            data.products.map((product) => (
              <div
                key={product.id}
                className="card  sm:w-[45%] md:w-[30%] lg:w-[23%] xl:w[15%] bg-base-100  shadow-xl mx-2 my-4"
              >
                <figure className="px-10 pt-10">
                  <img
                    src={product.images[0]}
                    alt="Shoes"
                    className="rounded-xl"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{product.brand}</h2>
                  <p>{product.description}</p>
                  <div className="card-actions">
                    {state.items.some((item) => item.id === product.id) ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => removeToCart(product)}
                      >
                        Remove TO CART
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() => addToCart(product)}
                      >
                        ADD TO CART
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          {error && <div>Error: {error.message}</div>}
        </div>
      </div>
    </>
  );
};

export default Home;


