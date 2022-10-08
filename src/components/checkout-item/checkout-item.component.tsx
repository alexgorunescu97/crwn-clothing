import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton } from './checkout-item.styles';

import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action';
import { CartItem } from '../../store/cart/cart.types';
import { FC } from 'react';

type CheckoutItemProps = {
    checkoutItem: CartItem;
}

const CheckoutItem: FC<CheckoutItemProps> = ({ checkoutItem }) => {
    const { name, price, quantity, imageUrl } = checkoutItem;

    const cartItems = useSelector(selectCartItems);

    const dispatch = useDispatch();

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, checkoutItem));
    const increaseItemHandler = () => dispatch(addItemToCart(cartItems, checkoutItem));
    const decreaseItemHandler = () => dispatch(removeItemFromCart(cartItems, checkoutItem));

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

            <BaseSpan className='price'>${price}</BaseSpan>

            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>

        </CheckoutItemContainer>
    );

};

export default CheckoutItem;