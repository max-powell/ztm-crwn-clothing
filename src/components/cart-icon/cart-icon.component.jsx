import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import {
  CartIconContainer,
  ItemCount,
  ShoppingIcon,
} from './cart-icon.styles.jsx';

const CartIcon = () => {
  const { cartIsOpen, cartItemsQuantity, setCartIsOpen } =
    useContext(CartContext);
  const toggleCartIsOpen = () => setCartIsOpen(!cartIsOpen);
  return (
    <CartIconContainer onClick={toggleCartIsOpen}>
      <ShoppingIcon />
      <ItemCount>{cartItemsQuantity}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
