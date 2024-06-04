// ApiContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from '../hook/useApi'; 

const ApiContexts = createContext();

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url); 
      const data = await response.json();
     
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("https://dummyjson.com/products");
}, []);
  

  return (
    <ApiContexts.Provider value={{ data, loading, error, fetchData }}>
      {children}
    </ApiContexts.Provider>
  );
};

export const useApiData = () => useContext(ApiContexts);
