import { createContext, useState } from 'react';

export const CartContext = createContext({
  cartIsOpen: false,
  setCartIsOpen: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const contextValue = { cartIsOpen, setCartIsOpen };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
