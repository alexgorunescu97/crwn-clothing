import { createSelector } from "reselect";
import { RootState } from "../store";
import { CartState } from "./cart.reducer";

const selectCart = (state: RootState): CartState => state.cart;

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
    (cartItems): number => cartItems.reduce((totalCount, cartItem) => totalCount + cartItem.quantity, 0)
);
export const selectTotalPrice = createSelector(
    [selectCartItems],
    (cartItems): number => cartItems.reduce((totalPrice, cartItem) => totalPrice + cartItem.quantity * cartItem.price, 0)
);
