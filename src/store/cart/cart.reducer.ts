import { CartItem } from "./cart.types";
import { setCartItems, setIsCartDropdownOpen } from "./cart.action";

import { AnyAction } from "redux";

export type CartState = {
    readonly cartItems: CartItem[];
    readonly isCartDropdownOpen: boolean;
}

const CART_INITIAL_STATE: CartState = {
    cartItems: [],
    isCartDropdownOpen: false  
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {} as AnyAction) => {

    if (setCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload
        };
    }

    if (setIsCartDropdownOpen.match(action)) {
        return {
            ...state,
            isCartDropdownOpen: action.payload
        };
    }

    return state;
};