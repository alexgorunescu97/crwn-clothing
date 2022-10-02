import { useDispatch, useSelector } from 'react-redux';

import { forwardRef } from 'react';

import { setIsCartDropdownOpen } from '../../store/cart/cart.action';
import { selectIsCartDropdownOpen, selectCartCount } from '../../store/cart/cart.selector';

import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';

const CartIcon = forwardRef((_, ref) => {

    const isCartDropdownOpen = useSelector(selectIsCartDropdownOpen);
    const cartCount = useSelector(selectCartCount);

    const dispatch = useDispatch();

    const toggleIsCartDropdownOpen = () => dispatch(setIsCartDropdownOpen(!isCartDropdownOpen));

    return (
        <CartIconContainer ref={ref} onClick={toggleIsCartDropdownOpen}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>

    );
});

export default CartIcon;