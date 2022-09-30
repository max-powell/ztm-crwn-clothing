import { useContext } from 'react';

import { ReactComponent as ShoppingBagIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';

import './cart-icon.styles.scss';

const CartIcon = () => {
  const { cartIsOpen, cartItemsQuantity, setCartIsOpen } =
    useContext(CartContext);
  const toggleCartIsOpen = () => setCartIsOpen(!cartIsOpen);
  return (
    <div className='cart-icon-container' onClick={toggleCartIsOpen}>
      <ShoppingBagIcon className='shopping-icon' />
      <span className='item-count'>{cartItemsQuantity}</span>
    </div>
  );
};

export default CartIcon;
