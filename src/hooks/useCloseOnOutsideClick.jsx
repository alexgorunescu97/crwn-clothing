import { useEffect, useState } from "react";

export const useCloseOnOutsideClick = (dropdownRef, dropdownIconRef) => {

    const [isClickOutside, setIsClickOutside] = useState(false);

    useEffect(() => {

        const handleOutsideClick = (e) => {
            const dropdown = dropdownRef ? dropdownRef.current : null;
            const dropdownIcon = dropdownIconRef ? dropdownIconRef.current : null;
            if (dropdown && !dropdown.contains(e.target) && dropdownIcon && !dropdownIcon.contains(e.target)) {
                setIsClickOutside(true);
            } else {
                if (!dropdown && dropdownIcon && dropdownIcon.contains(e.target)) {
                    setIsClickOutside(false);
                }
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => document.removeEventListener('mousedown', handleOutsideClick);

    }, [dropdownRef, dropdownIconRef]);

    return isClickOutside;
};