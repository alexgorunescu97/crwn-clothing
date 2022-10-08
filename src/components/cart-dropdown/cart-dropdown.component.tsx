import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';

import { forwardRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { setIsCartDropdownOpen } from '../../store/cart/cart.action';

const CartDropdown = forwardRef<HTMLDivElement>((_, ref) => {

    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        dispatch(setIsCartDropdownOpen(false));
        navigate('/checkout')
    };

    return (
        <CartDropdownContainer ref={ref}>
            <CartItems>
                {
                    cartItems.length 
                        ? cartItems.map(item => <CartItem key={item.id} cartItem={item} />)
                        : <EmptyMessage>Your cart is empty</EmptyMessage>
                }
            </CartItems>

            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );
});

export default CartDropdown;