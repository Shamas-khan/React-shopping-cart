import { useEffect, useReducer } from "react";
import { useApi } from "../hook/useApi";

const dataReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
const initialState = {
  data: null,
  loading: true,
  error: null,
};
const ProductReducer = (url) => {
 

  const { data, loading, error } = useApi(url);
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    if(loading){
      dispatch({type:"FETCH_INIT"})
    }

    if (data) {
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    }
    if (error) {
      dispatch({ type: "FETCH_ERROR", payload: error });
    }
  }, [data, error]);

  return { state };
};

export default ProductReducer;
