import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './cart-icon.styles.scss';

const CartIcon = () => {

    const { isCartDropdownOpen, setCartDropdownOpen, cartCount } = useContext(CartContext);

    const toggleIsCartDropdownOpen = () => setCartDropdownOpen(!isCartDropdownOpen);

    return (
        <div className='cart-icon-container' onClick={toggleIsCartDropdownOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{cartCount}</span>
        </div>

    );
};

export default CartIcon;