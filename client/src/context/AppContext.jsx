import React, { createContext, useContext, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";


export const AppContext = createContext();


export const AppProvider = ({ children }) => {

  

  const value = {


  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => useContext(AppContext);
