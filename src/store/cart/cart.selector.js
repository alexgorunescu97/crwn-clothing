import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectIsCartDropdownOpen = createSelector(
    [selectCart],
    (cart) => cart.isCartDropdownOpen
);

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((totalCount, cartItem) => totalCount + cartItem.quantity, 0)
);
export const selectTotalPrice = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((totalPrice, cartItem) => totalPrice + cartItem.quantity * cartItem.price, 0)
);
