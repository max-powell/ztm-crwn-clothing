import { useReducer } from 'react';
import { createContext } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

// Reducer

const INITIAL_STATE = {
  cartItems: [],
  cartItemsQuantity: 0,
  cartTotal: 0,
};

const CART_ACTION_TYPES = {
  SET_CART_IS_OPEN: 'SET_CART_IS_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_IS_OPEN:
      return {
        ...state,
        cartIsOpen: payload,
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unknown action type ${type}`);
  }
};

// Selectors

const addItemToCartSelector = (cartItems, item) => {
  const existingCartItem = existingItemSelector(cartItems, item);
  if (existingCartItem) {
    return incrementItemQuantitySelector(cartItems, item);
  } else {
    return [...cartItems, { ...item, quantity: 1 }];
  }
};

const clearItemFromCartSelector = (cartItems, item) => {
  return cartItems.filter((itemInCart) => itemInCart.id !== item.id);
};

const decrementItemQuantitySelector = (cartItems, item) => {
  return cartItems.map((itemInCart) =>
    itemInCart.id === item.id
      ? { ...itemInCart, quantity: itemInCart.quantity - 1 }
      : itemInCart
  );
};

const existingItemSelector = (cartItems, item) => {
  return cartItems.find((itemInCart) => itemInCart.id === item.id);
};

const incrementItemQuantitySelector = (cartItems, item) => {
  return cartItems.map((itemInCart) =>
    itemInCart.id === item.id
      ? { ...itemInCart, quantity: itemInCart.quantity + 1 }
      : itemInCart
  );
};

const removeItemFromCartSelector = (cartItems, item) => {
  const existingCartItem = existingItemSelector(cartItems, item);
  if (existingCartItem.quantity > 1) {
    return decrementItemQuantitySelector(cartItems, item);
  } else {
    return clearItemFromCartSelector(cartItems, item);
  }
};

// Reducer functions
const cartTotalReducer = (total, item) => total + item.quantity * item.price;

const itemQuantityReducer = (total, item) => total + item.quantity;

// Context

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
  const [{ cartIsOpen, cartItems, cartItemsQuantity, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItems = (newCartItems) => {
    const payload = {
      cartItems: newCartItems,
      cartItemsQuantity: newCartItems.reduce(itemQuantityReducer, 0),
      cartTotal: newCartItems.reduce(cartTotalReducer, 0),
    };
    const action = createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload);
    dispatch(action);
  };

  const addItemToCart = (itemToAdd) => {
    const newCartItems = addItemToCartSelector(cartItems, itemToAdd);
    updateCartItems(newCartItems);
  };

  const clearItemFromCart = (itemToDelete) => {
    const newCartItems = clearItemFromCartSelector(cartItems, itemToDelete);
    updateCartItems(newCartItems);
  };

  const removeItemFromCart = (itemToRemove) => {
    const newCartItems = removeItemFromCartSelector(itemToRemove);
    updateCartItems(newCartItems);
  };

  const setCartIsOpen = (cartIsOpen) => {
    const action = createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, cartIsOpen);
    dispatch(action);
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
