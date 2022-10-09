import React, { useEffect, useState } from "react";

export const useCloseOnOutsideClick = (dropdownRef: React.RefObject<HTMLElement>, dropdownIconRef: React.RefObject<HTMLElement>) => {

    const [isClickOutside, setIsClickOutside] = useState(false);

    useEffect(() => {

        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as Node;
            const dropdown = dropdownRef ? dropdownRef.current : null;
            const dropdownIcon = dropdownIconRef ? dropdownIconRef.current : null;
            if (dropdown && !dropdown.contains(target) && dropdownIcon && !dropdownIcon.contains(target)) {
                setIsClickOutside(true);
            } else {
                if (!dropdown && dropdownIcon && dropdownIcon.contains(target)) {
                    setIsClickOutside(false);
                }
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => document.removeEventListener('mousedown', handleOutsideClick);

    }, [dropdownRef, dropdownIconRef]);

    return isClickOutside;
};