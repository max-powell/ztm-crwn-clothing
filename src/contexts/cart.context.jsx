import { useEffect } from 'react';
import { createContext, useState } from 'react';

const clearItemFromCartItems = (cartItems, product) => {
  return cartItems.filter((item) => item.id !== product.id);
};

const decrementItemQuantityInCartItems = (cartItems, product) => {
  return cartItems.map((item) =>
    item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
  );
};

const existingItemSelector = (cartItems, product) => {
  return cartItems.find((item) => item.id === product.id);
};

const incrementItemQuantityInCartItems = (cartItems, product) => {
  return cartItems.map((item) =>
    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  );
};

const cartTotalReducer = (total, item) => total + item.quantity * item.price;
const itemQuantityReducer = (total, item) => total + item.quantity;

export const CartContext = createContext({
  addItemToCart: () => {},
  cartIsOpen: false,
  cartItems: [],
  cartItemsQuantity: 0,
  cartTotal: 0,
  clearItemFromCart: () => {},
  removeItemFromCart: () => {},
  setCartIsOpen: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsQuantity, setCartItemsQuantity] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartItemsQuantity = cartItems.reduce(itemQuantityReducer, 0);
    setCartItemsQuantity(newCartItemsQuantity);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(cartTotalReducer, 0);
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    let newCartItems;
    const existingCartItem = existingItemSelector(cartItems, productToAdd);
    if (existingCartItem) {
      newCartItems = incrementItemQuantityInCartItems(cartItems, productToAdd);
    } else {
      newCartItems = [...cartItems, { ...productToAdd, quantity: 1 }];
    }
    setCartItems(newCartItems);
  };

  const clearItemFromCart = (productToDelete) => {
    const newCartItems = clearItemFromCartItems(cartItems, productToDelete);
    setCartItems(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    let newCartItems;
    const existingCartItem = existingItemSelector(cartItems, productToRemove);
    if (existingCartItem.quantity > 1) {
      newCartItems = decrementItemQuantityInCartItems(
        cartItems,
        productToRemove
      );
    } else {
      newCartItems = clearItemFromCartItems(existingCartItem);
    }
    setCartItems(newCartItems);
  };

  const contextValue = {
    addItemToCart,
    cartIsOpen,
    cartItems,
    cartItemsQuantity,
    cartTotal,
    clearItemFromCart,
    removeItemFromCart,
    setCartIsOpen,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
