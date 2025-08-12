import React from 'react'
import { createContext, useState } from 'react'

export const contextVenda = createContext()

//configurações
export const ContextProvider = ({ children }) => {
  //variável globl
  const [produtos, setProdutos] = useState([]);
  const [component, setComponent] = useState('home')


  return (
    <contextVenda.Provider value={{ produtos, setProdutos, component, setComponent }}>
      {children}
    </contextVenda.Provider>
  );
};
