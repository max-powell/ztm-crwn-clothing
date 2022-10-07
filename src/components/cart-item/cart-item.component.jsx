import {
  CartItemContainer,
  CartItemDetails,
  CartItemImage,
  Detail,
} from './cart-item.styles';

const CartItem = ({ cartItem }) => {
  const { imageUrl, name, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <CartItemImage src={imageUrl} alt={name} />
      <CartItemDetails>
        <Detail>{name}</Detail>
        <Detail>
          {quantity} x £{price}
        </Detail>
      </CartItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
