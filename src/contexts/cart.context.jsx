import { createContext, useState } from "react";

export const CartContext = createContext({
    cartProducts: [],
    setCartProducts: () => null,
    isCartDropdownOpen: false,
    setCartDropdownOpen: () => null
});

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);
    const [isCartDropdownOpen, setCartDropdownOpen] = useState(false);

    const value = { cartProducts, setCartProducts, isCartDropdownOpen, setCartDropdownOpen };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};