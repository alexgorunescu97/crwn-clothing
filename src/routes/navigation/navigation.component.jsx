import { Fragment, useRef } from 'react';
import { Outlet } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { useCloseOnOutsideClick } from '../../hooks/useCloseOnOutsideClick';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartDropdownOpen } from '../../store/cart/cart.selector';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';
import { signOutStart } from '../../store/user/user.action';
import { useEffect } from 'react';
import { setIsCartDropdownOpen } from '../../store/cart/cart.action';

const Navigation = () => {

    const currentUser = useSelector(selectCurrentUser);
    const isCartDropdownOpen = useSelector(selectIsCartDropdownOpen);

    const dropdownRef = useRef(null);
    const dropdownIconRef = useRef(null);
    const isOutsideDropdownClick = useCloseOnOutsideClick(dropdownRef, dropdownIconRef);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isOutsideDropdownClick) {
            dispatch(setIsCartDropdownOpen(false));
        }
    }, [isOutsideDropdownClick])

    const signOutUser = () => dispatch(signOutStart());

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo />
                </LogoContainer>

                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>

                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                        ) : (
                            <NavLink to='/auth'>
                                SIGN IN
                            </NavLink>
                        )

                    }

                    <CartIcon ref={dropdownIconRef}/>
                </NavLinks>
                {
                    isCartDropdownOpen && <CartDropdown ref={dropdownRef} />
                }
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;