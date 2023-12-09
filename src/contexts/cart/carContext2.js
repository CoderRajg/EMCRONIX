import React, { createContext, useContext, useState } from "react";

const TotalAmountContext = createContext();

export const TotalAmountProvider = ({ children }) => {
  const [totalAmount, setTotalAmount] = useState(0);

  const updateTotalAmount = (amount) => {
    setTotalAmount(amount);
  };

  return (
    <TotalAmountContext.Provider value={{ totalAmount, updateTotalAmount }}>
      {children}
    </TotalAmountContext.Provider>
  );
};

export const useTotalAmount = () => {
  return useContext(TotalAmountContext);
};
