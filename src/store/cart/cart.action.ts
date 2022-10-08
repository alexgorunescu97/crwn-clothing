import { createAction, withMatcher, ActionWithPayload } from "../../utils/reducer/reducer.utils";

import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CategoryItem } from "../categories/category.types";

export type SetIsCartDropdownOpen = ActionWithPayload<CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN, boolean>
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export const setIsCartDropdownOpen = withMatcher((isOpen: boolean): SetIsCartDropdownOpen => createAction(CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN, isOpen));
export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

const addCartItem = (cartItems: CartItem[], itemToAdd: CategoryItem): CartItem[] => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === itemToAdd.id);

    if (existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id === itemToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem)
    }

    return [...cartItems, {...itemToAdd, quantity: 1}];
};

const removeCartItem = (cartItems: CartItem[], itemToRemove: CartItem): CartItem[] => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === itemToRemove.id);

    if (existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== existingCartItem.id);
    }

    return cartItems.map(cartItem => 
        cartItem.id === itemToRemove.id 
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem);
};

const clearCartItem = (cartItems: CartItem[], itemToClear: CartItem): CartItem[] => {
    return cartItems.filter(cartItem => cartItem.id !== itemToClear.id);
};

export const addItemToCart = (cartItems: CartItem[], itemToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, itemToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], itemToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, itemToRemove);
    return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return setCartItems(newCartItems);
};

export const clearCart = () => {
    return setCartItems([]);
};