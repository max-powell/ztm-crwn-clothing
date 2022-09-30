import { useEffect } from 'react';
import { createContext, useState } from 'react';

const existingItemSelector = (cartItems, product) => {
  return cartItems.find((item) => item.id === product.id);
};

const itemQuantityReducer = (total, item) => total + item.quantity;

export const CartContext = createContext({
  cartIsOpen: false,
  cartItems: [],
  cartItemsQuantity: 0,
  setCartIsOpen: () => {},
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsQuantity, setCartItemsQuantity] = useState(0);

  useEffect(() => {
    const newCartItemsQuantity = cartItems.reduce(itemQuantityReducer, 0);
    setCartItemsQuantity(newCartItemsQuantity);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    const existingCartItem = existingItemSelector(cartItems, productToAdd);
    if (existingCartItem) {
      const newCartItems = cartItems.map((item) =>
        item.id === productToAdd.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(newCartItems);
    } else {
      setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
    }
  };

  const contextValue = {
    addItemToCart,
    cartIsOpen,
    cartItems,
    cartItemsQuantity,
    setCartIsOpen,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
