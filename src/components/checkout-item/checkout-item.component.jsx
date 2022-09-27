import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton } from './checkout-item.styles';

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ checkoutItem }) => {
    const { name, price, quantity, imageUrl } = checkoutItem;

    const { removeItemFromCart, addItemToCart, clearItemFromCart } = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(checkoutItem);
    const increaseItemHandler = () => addItemToCart(checkoutItem);
    const decreaseItemHandler = () => removeItemFromCart(checkoutItem);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name}/>
            </ImageContainer>

            <BaseSpan className='name'>{name}</BaseSpan>

            <Quantity>
                <Arrow onClick={decreaseItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={increaseItemHandler}>&#10095;</Arrow>
            </Quantity>

            <BaseSpan className='price'>{price}</BaseSpan>

            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>

        </CheckoutItemContainer>
    );

};

export default CheckoutItem;