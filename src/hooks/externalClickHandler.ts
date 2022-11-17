import React, { useEffect } from "react";

/**
 * This function tracks the focus of an element
 * On loss of focus, e.g. another element is interacted with
 * it will return a boolean
 * @param ref The HTML element you're expecting to keep focus
 * @param action The callback function to return a value
 */
export const ExternalClickHandler = (
    ref: React.RefObject<HTMLDivElement>,
    action: Function
) => {
    useEffect(() => {
        const handleClickOutside = ({ target }: MouseEvent) => {
            if (ref && ref.current && !ref.current.contains(target as Node)) {
                action(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, action]);
};
