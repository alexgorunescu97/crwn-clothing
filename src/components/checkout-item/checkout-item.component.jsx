import './checkout-item.styles.scss';

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ checkoutItem }) => {
    const { name, price, quantity, imageUrl } = checkoutItem;

    const { removeItemFromCart, addItemToCart, clearItemFromCart } = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(checkoutItem);
    const increaseItemHandler = () => addItemToCart(checkoutItem);
    const decreaseItemHandler = () => removeItemFromCart(checkoutItem);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name}/>
            </div>

            <span className='name'>{name}</span>

            <div className='quantity'>
                <span className='arrow' onClick={decreaseItemHandler}>&#10094;</span>
                <span className='value'>{quantity}</span>
                <span className='arrow' onClick={increaseItemHandler}>&#10095;</span>
            </div>

            <span className='price'>{price}</span>

            <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>

        </div>
    );

};

export default CheckoutItem;