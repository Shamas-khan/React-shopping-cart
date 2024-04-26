import { useApi } from "../hook/useApi";
import {Spinner} from '../components/Spinner'

const Home = () => {
  const {loading, data, error} = useApi("https://dummyjson.com/products");
  console.log("home");
  const { products } = data;
  console.log('dsda',products);
  return (
    <>
      <div className="container mx-auto ">
        <div className="flex flex-wrap  ">    
           {loading && <Spinner/>} 
          {products?.map((product) => (
            <div
              key={product.id}
              className="card sm:w-[45%] md:w-[30%] lg:w-[23%] bg-base-100  shadow-xl mx-2 my-4"
            >
              <figure className="px-10 pt-10">
                <img
                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions">
                  <button className="btn btn-primary">ADD TO CART</button>
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
