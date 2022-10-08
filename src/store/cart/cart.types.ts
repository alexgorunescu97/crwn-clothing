import { CategoryItem } from "../categories/category.types";

export enum CART_ACTION_TYPES {
    SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
    TOGGLE_CART_DROPDOWN = 'cart/TOGGLE_CART_DROPDOWN'
}

export type CartItem = CategoryItem & { quantity: number };