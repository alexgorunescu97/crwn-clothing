import './checkout.styles.scss';

import { useContext } from 'react';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { CartContext } from '../../contexts/cart.context';

const Checkout = () => {

    const { cartItems, totalPrice } = useContext(CartContext);

    return (
        <div className='checkout-container'>
            <div class='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map(cartItem => <CheckoutItem key={cartItem.id} checkoutItem={cartItem}/>)
            }

            <span className='total'>TOTAL: ${totalPrice}</span>
        </div>
    )
};

export default Checkout;