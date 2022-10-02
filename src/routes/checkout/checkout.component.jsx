import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';

import { useSelector } from 'react-redux';

import { selectCartItems, selectTotalPrice } from '../../store/cart/cart.selector';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import PaymentForm from '../../components/payment-form/payment-form.component';

const Checkout = () => {

    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {
                cartItems.map(cartItem => <CheckoutItem key={cartItem.id} checkoutItem={cartItem}/>)
            }

            <Total>TOTAL: ${totalPrice}</Total>
            <PaymentForm />
        </CheckoutContainer>
    )
};

export default Checkout;