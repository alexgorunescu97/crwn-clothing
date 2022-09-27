import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';

const CartIcon = () => {

    const { isCartDropdownOpen, setCartDropdownOpen, cartCount } = useContext(CartContext);

    const toggleIsCartDropdownOpen = () => setCartDropdownOpen(!isCartDropdownOpen);

    return (
        <CartIconContainer onClick={toggleIsCartDropdownOpen}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>

    );
};

export default CartIcon;